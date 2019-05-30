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

export const DEFAULT_CONFIG: Partial<WSNodeClientConfig> = {
  autoConnect: true,
  clientOptions: {
    fragmentOutgoingMessages: false
  },
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000
}

export interface WSNodeClientEventEmitter {
  new(): StrictEventEmitter<EventEmitter, WSTransportEventMap>
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
  private state: TransportReadyState = TransportReadyState.INIT
  private lifeCycle: EventEmitter = new EventEmitter()
  private client?: WebSocketClient
  private connection?: WebSocketConnection
  private attempts: number = 0

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
      this.lifeCycle.on('reconnect', () => {
        this.attempts++
        this.emit('reconnect', this.attempts)
        this.open()
      })
    }
  }

  public open (): void {
    TransportReadyState.assert(this.state, [
      TransportReadyState.INIT,
      TransportReadyState.CLOSED
    ])

    this.state = TransportReadyState.CONNECTING

    this.client = new WebSocketClient({
      fragmentOutgoingMessages: false,
      ...this.config.clientOptions
    })
      .once('connect', (connection: WebSocketConnection) => {
        this.state = TransportReadyState.OPEN
        this.attempts = 0 // reset
        this.connection = connection
          .on('message', (msg) => {
            TransportMessage.assert(msg)
            this.emit('message', msg.utf8Data || '')
          })
          .on('error', (err) => {
            this.emit('error', new ConnectionError(err))
          })
          .on('close', (code, reason) => {
            this.state = TransportReadyState.CLOSED
            this.connection = undefined
            this.client = undefined
            this.emit('close', code, reason)
            if (code !== 1000) {
              this.lifeCycle.emit('reconnect')
            }
          })
        this.emit('open')
      })
      .once('connectFailed', (err: Error) => {
        this.state = TransportReadyState.CLOSED
        this.connection = undefined
        this.client = undefined
        const connectionError = new ConnectionError(err)
        this.emit('error', connectionError)
        this.lifeCycle.emit('reconnect')
      })

    const authHeaders = typeof this.config.accessToken !== 'string' ? {}
      : { Authorization: `Bearer ${this.config.accessToken}` }

    this.client.connect(this.config.url, undefined, undefined,
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
      TransportReadyState.OPEN
    ])

    this.state = TransportReadyState.CLOSING
    const connection = this.connection as WebSocketConnection
    connection.close(code, reason)
  }
}
