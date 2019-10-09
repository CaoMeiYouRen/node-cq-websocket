import test from 'ava'
import { spy } from 'sinon'
import { omit } from 'lodash'

import { DuplexConnection } from '../../src/connection/DuplexConnection'

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
  const startedAt = Date.now()
  const response = await connection.send(message)
  t.deepEqual(response, expectedResponse)
  t.true(Date.now() - startedAt >= expectedResponseDelay)
  t.true(dataSpy.calledOnce)
  t.deepEqual(omit(JSON.parse(dataSpy.getCall(0).lastArg), [ 'echo' ]), expectedResponse)
})

test('recv()', async (t) => {
  const socket = new Socket()
  const connection = socket.createConnection(DuplexConnection)

  const mockedRecvDelay = 100
  const mockedMessage = {
    post_type: 'test',
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
