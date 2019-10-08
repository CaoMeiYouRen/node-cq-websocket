import test from 'ava'
import { spy } from 'sinon'
import { omit } from 'lodash'

import { Socket } from '../helpers/socket'

import { WritableConnection } from '../../src/connection/WritableConnection'
import {
  TimeoutError,
  AbortError,
  StateError
} from '../../src/errors'

test('send(request)', async (t) => {
  const mockedURL = 'ws://fake_url'
  const mockedResponseDelay = 500
  const mockedResponse = {
    retcode: 0
  }

  const expectedResponseDelay = mockedResponseDelay
  const expectedResponse = omit(mockedResponse, [ 'echo' ])

  const socket = new Socket({
    url: mockedURL,
    responsePayload: mockedResponse,
    responseDelay: mockedResponseDelay
  })
  const connection = socket.createConnection(WritableConnection)

  const dataSpy = spy()
  connection.on('data', dataSpy)

  const message = { fake: true }
  const startedAt = Date.now()
  const response = await connection.send(message)
  t.deepEqual(response, expectedResponse)
  t.true(Date.now() - startedAt >= expectedResponseDelay)
  t.true(dataSpy.calledOnce)
  t.deepEqual(omit(JSON.parse(dataSpy.getCall(0).lastArg), [ 'echo' ]), expectedResponse)
})

test('send(request, timeout)', async (t) => {
  const mockedURL = 'ws://fake_url'
  const mockedResponseDelay = 500
  const mockedResponse = {
    retcode: 0
  }

  const socket = new Socket({
    url: mockedURL,
    responsePayload: mockedResponse,
    responseDelay: mockedResponseDelay
  })
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
  const socket = new Socket({
    responseDelay: 500
  })
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
