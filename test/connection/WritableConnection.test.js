import test from 'ava'
import { spy } from 'sinon'
import { omit } from 'lodash'

import { Socket } from '../helpers/socket'

import {
  WritableConnection,
  MessageError,
  TimeoutError,
  AbortError,
  StateError,
  UnhandledReponseError } from '../../'

test('send(request)', async (t) => {
  const mockedResponseDelay = 500
  const mockedResponse = {
    retcode: 0
  }

  const expectedResponse = mockedResponse

  const socket = new Socket()
  const connection = socket.createConnection(WritableConnection)

  const dataSpy = spy()
  connection.on('data', dataSpy)

  setTimeout(() => socket.ack(mockedResponse), mockedResponseDelay)

  const message = { fake: true }
  const response = await connection.send(message)
  t.deepEqual(response, expectedResponse)
  t.true(dataSpy.calledOnce)
  t.deepEqual(omit(JSON.parse(dataSpy.getCall(0).lastArg), [ 'echo' ]), expectedResponse)
})

test('send(request, timeout)', async (t) => {
  const mockedURL = 'ws://fake_url'

  const socket = new Socket(mockedURL)
  const connection = socket.createConnection(WritableConnection)

  const dataSpy = spy()
  connection.on('data', dataSpy)

  const errorSpy = spy()
  connection.on('error', errorSpy)

  await t.throwsAsync(() => connection.send({ fake: true }, 100), TimeoutError)
  t.true(errorSpy.calledOnce)
  t.is(errorSpy.firstCall.args.length, 1)
  t.true(errorSpy.firstCall.args[0] instanceof TimeoutError)
  t.is(errorSpy.firstCall.args[0].action, 'send')
  t.false(dataSpy.called)
})

test('send(request) after connection closed', async (t) => {
  const socket = new Socket()
  const connection = socket.createConnection(WritableConnection)
  socket.close()

  const dataSpy = spy()
  connection.on('data', dataSpy)

  const errorSpy = spy()
  connection.on('error', errorSpy)

  const error = await t.throwsAsync(() => connection.send({ fake: true }), StateError)
  t.true(errorSpy.calledOnce)
  t.is(errorSpy.firstCall.args.length, 1)
  t.true(errorSpy.firstCall.args[0] instanceof StateError)
  t.is(errorSpy.firstCall.args[0], error)
  t.is(errorSpy.firstCall.args[0].action, 'send')
  t.false(dataSpy.called)
})

test('send(request) while connection closing', async (t) => {
  const socket = new Socket()
  const connection = socket.createConnection(WritableConnection)

  const dataSpy = spy()
  connection.on('data', dataSpy)

  const errorSpy = spy()
  connection.on('error', errorSpy)

  setTimeout(() => socket.close(), 100)

  const error = await t.throwsAsync(() => connection.send({ fake: true }), AbortError)
  t.true(errorSpy.calledOnce)
  t.is(errorSpy.firstCall.args.length, 1)
  t.true(errorSpy.firstCall.args[0] instanceof AbortError)
  t.is(errorSpy.firstCall.args[0], error)
  t.is(errorSpy.firstCall.args[0].action, 'send')
  t.false(dataSpy.called)
})

test('message error', async (t) => {
  const socket = new Socket()
  const connection = socket.createConnection(WritableConnection)

  const validMessage = '{"retcode": 123456, "echo": ""}'
  const invalidMessage1 = '{"post_type": "test", "test_type": ""}' // event payload
  const invalidMessage2 = '{"invalid": true}' // unexpected payload

  const errorSpy = spy()
  connection.on('error', errorSpy)

  socket.recv(validMessage) // invalid since no reponse handler
  socket.recv(invalidMessage1)
  socket.recv(invalidMessage2)

  t.true(errorSpy.calledThrice)
  const [[error1], [error2], [error3]] = errorSpy.args
  t.true(error1 instanceof UnhandledReponseError)
  t.true(error2 instanceof MessageError)
  t.true(error3 instanceof MessageError)
  t.deepEqual(error1.response, JSON.parse(validMessage))
  t.is(error2.message, invalidMessage1)
  t.is(error3.message, invalidMessage2)
})
