import pTimeout from 'p-timeout'

import { Connection, ConnectionEvents, ConnectionInfo, WebSocketLike } from './Connection'
import { MessageError, TimeoutError, ConnectionError } from '../errors'
import { msg as msgDebug, main as debug } from '../debug'
import { isEventPayload, parseMessage } from '../utils'

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
    this._proxy.on('message', (msg: string) => {
      msgDebug('recv: %s', msg)
      let payload: Record<string, any>
      try {
        payload = parseMessage(msg)
      } catch (err) {
        this.emit('error', err)
        return
      }
      if (typeof payload !== 'object') {
        const msgError = new MessageError(msg, 'the payload is not a JSON object')
        this.emit('error', msgError)
        return
      }
      if (isEventPayload(payload)) {
        this.emit('_message_parse', payload)
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
