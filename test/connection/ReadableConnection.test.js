import test from 'ava'
import { spy } from 'sinon'

import { Socket } from '../helpers/socket'
import {
  ReadableConnection,
  MessageError,
  TimeoutError,
  StateError,
  AbortError } from '../../'

test('recv()', async (t) => {
  const socket = new Socket()
  const connection = socket.createConnection(ReadableConnection)

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

  const msg = await connection.recv()
  t.deepEqual(msg, expectedMessage)
  t.true(dataSpy.calledOnce)
  t.true(dataSpy.calledWithExactly(expectedMessageStr))
  t.true(messageSpy.calledOnce)
  t.true(messageSpy.calledWithExactly(expectedMessage))
})

test('recv(timeout)', async (t) => {
  const socket = new Socket()
  const connection = socket.createConnection(ReadableConnection)

  const dataSpy = spy()
  const messageSpy = spy()
  const errorSpy = spy()

  connection.on('data', dataSpy)
  connection.on('message', messageSpy)
  connection.on('error', errorSpy)

  await t.throwsAsync(() => connection.recv(100), TimeoutError)
  t.false(dataSpy.called)
  t.false(messageSpy.called)
  t.true(errorSpy.calledOnce)
  t.true(errorSpy.getCall(0).lastArg instanceof TimeoutError)
  t.is(errorSpy.getCall(0).lastArg.action, 'recv')
})

test('recv() after connection closed', async (t) => {
  const socket = new Socket()
  const connection = socket.createConnection(ReadableConnection)

  socket.close()

  const dataSpy = spy()
  const messageSpy = spy()
  const errorSpy = spy()

  connection.on('data', dataSpy)
  connection.on('message', messageSpy)
  connection.on('error', errorSpy)

  await t.throwsAsync(() => connection.recv(), StateError)
  t.false(dataSpy.called)
  t.false(messageSpy.called)
  t.true(errorSpy.calledOnce)
  t.true(errorSpy.getCall(0).lastArg instanceof StateError)
  t.is(errorSpy.getCall(0).lastArg.action, 'recv')
})

test('recv() while connection closing', async (t) => {
  const socket = new Socket()
  const connection = socket.createConnection(ReadableConnection)

  setTimeout(() => socket.close(), 100)

  const dataSpy = spy()
  const messageSpy = spy()
  const errorSpy = spy()

  connection.on('data', dataSpy)
  connection.on('message', messageSpy)
  connection.on('error', errorSpy)

  await t.throwsAsync(() => connection.recv(), AbortError)
  t.false(dataSpy.called)
  t.false(messageSpy.called)
  t.true(errorSpy.calledOnce)
  t.true(errorSpy.getCall(0).lastArg instanceof AbortError)
  t.is(errorSpy.getCall(0).lastArg.action, 'recv')
})

test('message error', async (t) => {
  const socket = new Socket()
  const connection = socket.createConnection(ReadableConnection)

  const validMessage = '{"post_type": "test", "test_type": ""}'
  const invalidMessage1 = '{"retcode": 123456, "echo": ""}' // response payload
  const invalidMessage2 = '{"invalid": true}' // unexpected payload

  const errorSpy = spy()
  connection.on('error', errorSpy)

  socket.recv(validMessage)
  socket.recv(invalidMessage1)
  socket.recv(invalidMessage2)

  t.true(errorSpy.calledTwice)
  const [[error1], [error2]] = errorSpy.args
  t.true(error1 instanceof MessageError)
  t.true(error2 instanceof MessageError)
  t.is(error1.message, invalidMessage1)
  t.is(error2.message, invalidMessage2)
})
