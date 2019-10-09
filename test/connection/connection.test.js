import test from 'ava'
import { spy } from 'sinon'

import { Socket } from '../helpers/socket'

import { Connection } from '../../src/connection/Connection'
import { TimeoutError, MessageError } from '../../src/errors'

test('close(code, reason)', async (t) => {
  const mockedURL = 'ws://fake_url'
  const mockedCloseDelay = 500
  const mockedCloseCode = 1234
  const mockedCloseReason = 'fake closure'

  const expectedURL = mockedURL
  const expectedCloseDelay = mockedCloseDelay
  const expectedCloseCode = mockedCloseCode
  const expectedCloseReason = mockedCloseReason

  const socket = new Socket(mockedURL)
  const connection = socket.createConnection(Connection)

  t.is(connection.url, expectedURL)
  t.true(connection.openedAt instanceof Date)
  t.false(connection.closed)
  t.is(connection.closedAt, undefined)
  t.is(connection.closeCode, undefined)
  t.is(connection.closeReason, undefined)

  const closeSpy = spy()
  connection.on('close', closeSpy)

  setTimeout(() => socket.close(mockedCloseCode, mockedCloseReason), mockedCloseDelay)

  const startedAt = Date.now()
  await connection.close(mockedCloseCode, mockedCloseReason)
  t.true(closeSpy.calledOnce)
  t.true(closeSpy.calledWithExactly(expectedCloseCode, expectedCloseReason))
  t.true(Date.now() - startedAt >= expectedCloseDelay)
  t.true(connection.closed)
  t.true(connection.closedAt instanceof Date)
  t.is(connection.closeCode, expectedCloseCode)
  t.is(connection.closeReason, expectedCloseReason)
})

test('close({code, reason})', async (t) => {
  const mockedURL = 'ws://fake_url'
  const mockedCloseDelay = 500
  const mockedCloseCode = 1234
  const mockedCloseReason = 'fake closure'

  const expectedURL = mockedURL
  const expectedCloseDelay = mockedCloseDelay
  const expectedCloseCode = mockedCloseCode
  const expectedCloseReason = mockedCloseReason

  const socket = new Socket(mockedURL)
  const connection = socket.createConnection(Connection)

  t.is(connection.url, expectedURL)
  t.true(connection.openedAt instanceof Date)
  t.false(connection.closed)
  t.is(connection.closedAt, undefined)
  t.is(connection.closeCode, undefined)
  t.is(connection.closeReason, undefined)

  setTimeout(() => socket.close(mockedCloseCode, mockedCloseReason), mockedCloseDelay)

  const closeSpy = spy()
  connection.on('close', closeSpy)

  const startedAt = Date.now()
  await connection.close({ code: mockedCloseCode, reason: mockedCloseReason })
  t.true(closeSpy.calledOnce)
  t.true(closeSpy.calledWithExactly(expectedCloseCode, expectedCloseReason))
  t.true(Date.now() - startedAt >= expectedCloseDelay)
  t.true(connection.closed)
  t.true(connection.closedAt instanceof Date)
  t.is(connection.closeCode, expectedCloseCode)
  t.is(connection.closeReason, expectedCloseReason)
})

test('close(code, reason, timeout)', async (t) => {
  const socket = new Socket()
  const connection = socket.createConnection(Connection)

  const errorSpy = spy()
  connection.on('error', errorSpy)

  const error = await t.throwsAsync(() => connection.close(undefined, undefined, 100), TimeoutError)
  t.true(errorSpy.calledOnce)
  t.is(errorSpy.lastCall.args[0], error)
})

test('close({timeout})', async (t) => {
  const mockedCloseTimeout = 100

  const socket = new Socket()
  const connection = socket.createConnection(Connection)

  const errorSpy = spy()
  connection.on('error', errorSpy)

  const error = await t.throwsAsync(() => connection.close({
    timeout: mockedCloseTimeout
  }), TimeoutError)

  t.true(errorSpy.calledOnce)
  t.is(errorSpy.lastCall.args[0], error)
})

test('message error', async (t) => {
  const socket = new Socket()
  const connection = socket.createConnection(Connection)

  const invalidMessage1 = '{invalid json}'
  const invalidMessage2 = '123'
  const invalidMessage3 = '{"invalid": true}'

  const errorSpy = spy()
  connection.on('error', errorSpy)

  socket.recv(invalidMessage1)
  socket.recv(invalidMessage2)
  socket.recv(invalidMessage3)

  t.true(errorSpy.calledThrice)
  const [[error1], [error2], [error3]] = errorSpy.args
  t.true(error1 instanceof MessageError)
  t.true(error2 instanceof MessageError)
  t.true(error3 instanceof MessageError)
  t.is(error1.data, invalidMessage1)
  t.is(error2.data, invalidMessage2)
  t.is(error3.data, invalidMessage3)
})
