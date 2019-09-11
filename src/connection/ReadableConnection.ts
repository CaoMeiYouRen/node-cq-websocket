import pTimeout from 'p-timeout'

import { Connection, ConnectionEvents, ConnectionInfo, WebSocketLike } from './Connection'
import { TimeoutError, ConnectionError } from '../errors'
import { main as debug } from '../debug'
import { isEventPayload } from '../utils'

export interface ReadableConnectionEvents extends ConnectionEvents {
  message (payload: Record<string, any>): void
}

export interface ReadableConnectionOptions {
  readTimeout: number
}

export declare interface ReadableConnection {
  on<E extends keyof ReadableConnectionEvents> (event: E, listener: ReadableConnectionEvents[E]): this
  addListener<E extends keyof ReadableConnectionEvents> (event: E, listener: ReadableConnectionEvents[E]): this
  prependListener<E extends keyof ReadableConnectionEvents> (event: E, listener: ReadableConnectionEvents[E]): this

  once<E extends keyof ReadableConnectionEvents> (event: E, listener: ReadableConnectionEvents[E]): this
  prependOnceListener<E extends keyof ReadableConnectionEvents> (event: E, listener: ReadableConnectionEvents[E]): this

  removeListener<E extends keyof ReadableConnectionEvents> (event: E, listener: ReadableConnectionEvents[E]): this
  removeAllListeners<E extends keyof ReadableConnectionEvents> (event?: E): this

  /**
   * @internal
   */
  emit (event: string, ...args: any[]): boolean
}

export class ReadableConnection extends Connection {
  public constructor (proxy: WebSocketLike, info: ConnectionInfo) {
    super(proxy, info)
    this._proxy.on(Connection.MESSAGE_PARSE, (payload: Record<string, any>) => {
      if (isEventPayload(payload)) {
        this.emit('message', payload)
      }
    })
  }

  public async recv (timeout: number = 30000): Promise<Record<string, any>> {
    debug('connection#recv()')

    if (this.closed) {
      debug('connection already closed')
      return Promise.reject(new ConnectionError('connection already closed'))
    }

    return pTimeout(
      new Promise((resolve, reject) => {
        this._proxy.once('_message_parse', resolve)
        this._proxy.once('close', () => reject(new ConnectionError('connection closed')))
      }),
      timeout,
      new TimeoutError(timeout, 'read timeout occurred')
    )
  }
}
