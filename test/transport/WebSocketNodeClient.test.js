import test from 'ava'
import _last from 'lodash/last'
import { createServer } from 'http'
import { server as WebSocketServer } from 'websocket'

import { WebSocketNodeClient } from '../../src/transport/ws/node/WebSocketNodeClient'
import { TransportReadyState } from '../../src/transport/Transport'

async function prepareServer () {
  const httpServer = createServer()
  const wsServer = new WebSocketServer({
    autoAcceptConnections: true,
    httpServer: httpServer
  })

  await new Promise((resolve, reject) => httpServer
    .on('error', reject)
    .listen(0, '127.0.0.1', resolve))
  
  return {
    httpServer,
    wsServer,
    shutDown: async () => {
      wsServer.shutDown()
      await new Promise(resolve => {
        httpServer.close((err) => err ? reject(err) : resolve())
      })
    }
  }
}

test('normal usage', async (t) => {
  t.plan(8)
    
  const { httpServer, wsServer, shutDown } = await prepareServer(bridge)
  wsServer.on('connect',
    (connection) => connection.on('message',
      (msg) => { // echo
          connection.sendUTF(msg.utf8Data)
      })).on('close', (code) => {
        t.is(code, 1000)
      })

  const { port } = httpServer.address()
  const url = `ws://127.0.0.1:${port}`
  const client = new WebSocketNodeClient({ url, autoConnect: false })

  t.log('open()')
  t.is(client.readyState, TransportReadyState.INIT)
  const opened = new Promise((resolve, reject) => {
    client.once('open', resolve)
    client.once('error', reject)
    client.open()
    t.is(client.readyState, TransportReadyState.CONNECTING)
  })
  await opened
  t.is(client.readyState, TransportReadyState.OPEN)

  t.log('on("message")')
  const text = 'hello'
  const responseText = new Promise((resolve, reject) => {
    client.once('message', (msg) => {
      resolve(msg)
    })
    client.once('error', reject)
    client.send(text)
  })
  t.is(await responseText, text)
  
  t.log('close()')
  t.is(client.readyState, TransportReadyState.OPEN)
  const closed = new Promise((resolve, reject) => {
    client.once('close', resolve)
    client.once('error', reject)
    client.close()
    t.is(client.readyState, TransportReadyState.CLOSING)
  })
  await closed
  t.is(client.readyState, TransportReadyState.CLOSED)

  await shutDown()
})

test('autoConnect', async (t) => {
  t.plan(2)

  const { httpServer, wsServer, shutDown } = await prepareServer(bridge)

  const { port } = httpServer.address()
  const url = `ws://127.0.0.1:${port}`
  const client = new WebSocketNodeClient({ url })
  
  const promise1 = new Promise((resolve) => wsServer.on('connect', () => {
    t.pass()
    resolve()
  }))
  const promise2 = new Promise((resolve) => client.on('open', () => {
    t.pass()
    resolve()
  }))

  await Promise.all([ promise1, promise2 ])
  await shutDown()
})

test.todo('reconnection')
