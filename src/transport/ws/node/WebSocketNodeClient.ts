/**
 * @module transport.ws.node
 */
import { EventEmitter } from 'events'
import {
  client as WebSocketClient,
  connection as WebSocketConnection,
  IClientConfig
} from 'websocket'
import _get from 'lodash/get'
import { StrictEventEmitter } from 'strict-event-emitter-types'

import {
  Transport,
  TransportMessage,
  TransportReadyState } from '../../Transport'
import { WSTransportConfig, WSTransportEventMap } from '../WSTransport'
import { RequestOptions } from 'https'
import { ConnectionError } from '../../TransportError'

export interface WSNodeClientConfig extends WSTransportConfig {
  clientOptions?: IClientConfig
  requestOptions?: RequestOptions
  headers?: Record<string, string>
}

export interface WSNodeClientEventMap extends WSTransportEventMap {
  readyStateChange (state: TransportReadyState): void
}

export interface WSNodeClientEventEmitter {
  new(): StrictEventEmitter<EventEmitter, WSNodeClientEventMap>
}

export namespace WebSocketNodeClient {
  /**
   * @event
   */
  export type reconnect = WSTransportEventMap['reconnect']

  /**
   * @event
   */
  export type open = WSTransportEventMap['open']

  /**
   * @event
   */
  export type close = WSTransportEventMap['close']

  /**
   * @event
   */
  export type error = WSTransportEventMap['error']

  /**
   * @event
   */
  export type message = WSTransportEventMap['message']
}

export class WebSocketNodeClient extends (EventEmitter as WSNodeClientEventEmitter)
  implements Transport {
  private lifeCycle: EventEmitter = new EventEmitter()
  private state: TransportReadyState = TransportReadyState.INIT
  private client?: WebSocketClient
  private connection?: WebSocketConnection
  private attempts: number = -1

  public get readyState () {
    return this.state
  }

  constructor (
    private config: WSNodeClientConfig) {
    super()
    if (_get(this.config, 'autoConnect', true)) {
      setImmediate(() => this.open())
    }
    if (_get(this.config, 'reconnection', true)) {
      const delay = _get(this.config, 'reconnectionDelay', 1000)
      const maxAttempts = _get(this.config, 'reconnectionAttempts', Infinity)
      this.lifeCycle.on('reconnect', () => {
        if (this.attempts >= maxAttempts) {
          return
        }
        setTimeout(() => {
          this.emit('reconnect', this.attempts)
          this.open()
        }, delay)
      })
    }
  }

  public open (): void {
    TransportReadyState.assert(this.state, [
      TransportReadyState.INIT,
      TransportReadyState.CLOSED
    ])

    const client = new WebSocketClient({
      fragmentOutgoingMessages: false,
      ...this.config.clientOptions
    }).once('connect', (connection: WebSocketConnection) => {
      connection.on('message', (msg) => {
        TransportMessage.assert(msg)
        this.emit('message', msg.utf8Data || '')
      }).on('error', (err) => {
        this.emit('error', new ConnectionError(err))
      }).on('close', (code, reason) => {
        this.setState(TransportReadyState.CLOSED)
        this.emit('close', code, reason)
        if (code !== 1000) {
          this.lifeCycle.emit('reconnect')
        }
      })
      this.setState(TransportReadyState.OPEN, connection)
      this.emit('open')
    }).once('connectFailed', (err: Error) => {
      this.setState(TransportReadyState.CLOSED)
      const connectionError = new ConnectionError(err)
      this.emit('error', connectionError)
      this.lifeCycle.emit('reconnect')
    })

    this.setState(TransportReadyState.CONNECTING, client)

    const authHeaders = typeof this.config.accessToken !== 'string' ? {}
      : { Authorization: `Bearer ${this.config.accessToken}` }

    client.connect(this.config.url, undefined, undefined,
      { ...authHeaders, ...this.config.headers }, this.config.requestOptions)
  }

  public send (payload: string): void {
    TransportReadyState.assert(this.state, [
      TransportReadyState.OPEN
    ])
    const connection = this.connection as WebSocketConnection
    connection.sendUTF(payload)
  }

  public close (code?: number | undefined, reason?: string | undefined): void {
    TransportReadyState.assert(this.state, [
      TransportReadyState.OPEN,
      TransportReadyState.CONNECTING
    ])

    if (this.state === TransportReadyState.CONNECTING) {
      // abort
      const client = this.client as WebSocketClient
      client.abort()
      this.setState(TransportReadyState.CLOSED)
    } else if (this.state === TransportReadyState.OPEN) {
      const connection = this.connection as WebSocketConnection
      connection.close(code, reason)
      this.setState(TransportReadyState.CLOSING)
    }
  }

  private setState (state: TransportReadyState, payload?: any): void {
    this.state = state
    switch (state) {
      case TransportReadyState.CONNECTING:
        this.client = payload as WebSocketClient
        this.attempts++
        break
      case TransportReadyState.OPEN:
        this.connection = payload as WebSocketConnection
        this.attempts = -1 // reset
        break
      case TransportReadyState.CLOSING:
        this.client = undefined
        break
      case TransportReadyState.CLOSED:
        this.connection = undefined
        // for the case that the connection is closed by the server
        this.client = undefined
        break
    }
    this.emit('readyStateChange', state)
  }
}
