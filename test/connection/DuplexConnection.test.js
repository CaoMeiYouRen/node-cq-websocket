import test from 'ava'
import { spy } from 'sinon'
import { omit } from 'lodash'

import { DuplexConnection,
  MessageError,
  UnhandledReponseError } from '../../'

import { Socket } from '../helpers/socket'

test('send(request)', async (t) => {
  const mockedURL = 'ws://fake_url'
  const mockedResponseDelay = 500
  const mockedResponse = {
    retcode: 0
  }

  const expectedResponseDelay = mockedResponseDelay
  const expectedResponse = omit(mockedResponse, [ 'echo' ])

  const socket = new Socket(mockedURL)
  const connection = socket.createConnection(DuplexConnection)

  const dataSpy = spy()
  connection.on('data', dataSpy)

  setTimeout(() => socket.ack(mockedResponse), mockedResponseDelay)

  const message = { fake: true }
  const response = await connection.send(message)
  t.deepEqual(response, expectedResponse)
  t.true(dataSpy.calledOnce)
  t.deepEqual(omit(JSON.parse(dataSpy.getCall(0).lastArg), [ 'echo' ]), expectedResponse)
})

test('recv()', async (t) => {
  const socket = new Socket()
  const connection = socket.createConnection(DuplexConnection)

  const mockedRecvDelay = 100
  const mockedMessage = {
    post_type: 'test',
    test_type: '',
    test: true
  }

  // shallow copy
  const expectedMessageStr = JSON.stringify(mockedMessage)
  const expectedMessage = JSON.parse(expectedMessageStr)

  setTimeout(() => {
    socket.recv(mockedMessage)
  }, mockedRecvDelay)

  const dataSpy = spy()
  const messageSpy = spy()

  connection.on('data', dataSpy)
  connection.on('message', messageSpy)

  // const msgp =
  const msg = await connection.recv()
  t.deepEqual(msg, expectedMessage)
  t.true(dataSpy.calledOnce)
  t.true(dataSpy.calledWithExactly(expectedMessageStr))
  t.true(messageSpy.calledOnce)
  t.true(messageSpy.calledWithExactly(expectedMessage))
})

test('message error', async (t) => {
  const socket = new Socket()
  const connection = socket.createConnection(DuplexConnection)

  const validMessage1 = '{"post_type": "test", "test_type": ""}' // event payload
  const validMessage2 = '{"retcode": 123456, "echo": ""}' // response payload
  const invalidMessage = '{"invalid": true}' // unexpected payload

  const errorSpy = spy()
  connection.on('error', errorSpy)

  socket.recv(validMessage1)
  socket.recv(validMessage2) // invalid since no response handler
  socket.recv(invalidMessage)

  t.true(errorSpy.calledTwice)
  const [[error1], [error2]] = errorSpy.args
  t.true(error1 instanceof UnhandledReponseError)
  t.true(error2 instanceof MessageError)
  t.deepEqual(error1.response, JSON.parse(validMessage2))
  t.is(error2.message, invalidMessage)
})
