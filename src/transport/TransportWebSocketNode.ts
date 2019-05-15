/**
 * @module transport
 */

import { EventEmitter } from 'events'
import { RequestOptions } from 'https'
import {
  client as WebSocketClient,
  IClientConfig,
  connection as WebSocketConnection
} from 'websocket'

import { Transport, TransportState, TransportConfig } from './Transport'
import { MessageError } from '../errors'

export interface WSNodeConfig extends TransportConfig {
  url: string
}

export class TransportWebSocketNode extends EventEmitter implements Transport {
  private _state: TransportState = TransportState.CONNECTING
  private _internal: EventEmitter = new EventEmitter()

  public get readyState (): TransportState {
    return this._state
  }

  constructor (
    config: WSNodeConfig,
    wsClientOptions?: IClientConfig,
    requestOptions?: RequestOptions
  ) {
    super()

    const client = new WebSocketClient({
      fragmentOutgoingMessages: false,
      ...wsClientOptions
    })
      .once('connect', (connection: WebSocketConnection) => {
        connection
          .once('close', (code: number, reason: string) => {
            connection.removeAllListeners()
            this._internal.removeAllListeners()
            this._state = TransportState.CLOSED
            this.emit('close', code, reason)
          })
          .on('error', (err) => this.emit('error', err))
          .on('message', (msg) => {
            if (msg.type === 'utf8') {
              this.emit('message', msg.utf8Data || '')
            } else {
              this.emit('error',
                new MessageError(`unexpected non-utf8 message (message type: "${msg.type}")`))
            }
          })
        this._internal.on('send', (msg: string) => connection.sendUTF(msg))
        this._internal.once('close', (code?: number, reason?: string) => {
          (connection.close as (code?: number, reason?: string) => void)(code, reason)
        })
        this._state = TransportState.OPEN
        this.emit('open')
      })
      .once('connectFailed', (err) => {
        this._state = TransportState.CLOSED
        this.emit('error', err)
      })

    // try connecting on next tick
    setImmediate(
      (headers, requestOptions) => {
        client.connect(config.url, undefined, undefined, headers, requestOptions)
      },
      config.accessToken ? { Authorization: `Bearer ${config.accessToken}` } : undefined,
      requestOptions
    )
  }

  close (code?: number, reason?: string): void {
    this._internal.emit('close', code, reason)
  }

  send (msg: string): void {
    this._internal.emit('send', msg)
  }
}
