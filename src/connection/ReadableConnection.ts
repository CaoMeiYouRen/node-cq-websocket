import pTimeout from 'p-timeout'

import {
  Connection,
  ConnectionEvents,
  WebSocketLike,
  EVENT_MESSAGE_PARSE,
  EVENT_CONNECTION_CLOSE
} from './Connection'
import { TimeoutError, ConnectionError } from '../errors'
import { main as debug } from '../debug'

/**
 * @internal
 */
export const EVENT_PAYLOAD = Symbol('internal payload event')

export interface ReadableConnectionEvents extends ConnectionEvents {
  message (payload: Record<string, any>): void
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
  emit<E extends keyof ReadableConnectionEvents> (event: E, ...args: any[]): boolean
}

export class ReadableConnection extends Connection {
  public constructor (socket: WebSocketLike) {
    super(socket)
    this._internal.on(EVENT_MESSAGE_PARSE, (payload) => {
      this.handlePayload(payload)
    })
  }

  public async recv (timeout: number = Infinity): Promise<Record<string, any>> {
    debug('connection#recv()')

    const recvPromise = new Promise<Record<string, any>>((resolve, reject) => {
      if (this.closed) {
        debug('connection already closed')
        return reject(new ConnectionError('connection already closed'))
      }
      this._internal.once(EVENT_PAYLOAD, resolve)
      this._internal.once(EVENT_CONNECTION_CLOSE,
        () => reject(new ConnectionError('connection closed')))
    })

    return !isFinite(timeout) ? recvPromise
      : pTimeout(recvPromise, timeout,
        new TimeoutError(timeout, 'read timeout'))
  }

  /**
   * @internal
   */
  public handlePayload (payload: Record<string, any>): boolean {
    if (typeof payload.post_type === 'string') {
      this._internal.emit(EVENT_PAYLOAD, payload)
      this.emit('message', payload)
      return true
    }
    return false
  }
}
