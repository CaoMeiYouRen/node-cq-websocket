import pTimeout from 'p-timeout'

import {
  Connection,
  ConnectionEvents,
  WebSocketLike,
  EVENT_MESSAGE_PARSE,
  EVENT_CONNECTION_CLOSE
} from './Connection'
import { main as debug, msg as msgDebug } from '../debug'
import { TimeoutError, ConnectionError } from '../errors'

/**
 * @internal
 */
export const EVENT_API_RESPONSE = Symbol('api response event')

export interface WritableConnectionEvents extends ConnectionEvents {
  response (payload: Record<string, any>): void
}

export declare interface WritableConnection {
  on<E extends keyof WritableConnectionEvents> (event: E, listener: WritableConnectionEvents[E]): this
  addListener<E extends keyof WritableConnectionEvents> (event: E, listener: WritableConnectionEvents[E]): this
  prependListener<E extends keyof WritableConnectionEvents> (event: E, listener: WritableConnectionEvents[E]): this

  once<E extends keyof WritableConnectionEvents> (event: E, listener: WritableConnectionEvents[E]): this
  prependOnceListener<E extends keyof WritableConnectionEvents> (event: E, listener: WritableConnectionEvents[E]): this

  removeListener<E extends keyof WritableConnectionEvents> (event: E, listener: WritableConnectionEvents[E]): this
  removeAllListeners<E extends keyof WritableConnectionEvents> (event?: E): this

  /**
   * @internal
   */
  emit<E extends keyof WritableConnectionEvents> (event: E, ...args: any[]): boolean
}

export class WritableConnection extends Connection {
  public constructor (socket: WebSocketLike) {
    super(socket)
    this._internal.on(EVENT_MESSAGE_PARSE, (payload: Record<string, any>) => {
      this.handlePayload(payload)
    })
  }

  public async send (payload: Record<string, any>, timeout: number = Infinity): Promise<Record<string, any>> {
    debug('connection#send()')
    msgDebug('send: %O', payload)

    const sendPromise = new Promise<Record<string, any>>((resolve, reject) => {
      if (this.closed) {
        debug('connection already closed')
        return reject(new ConnectionError('connection already closed'))
      }
      this._internal.once(EVENT_API_RESPONSE, resolve)
      this._internal.once(EVENT_CONNECTION_CLOSE,
        () => reject(new ConnectionError('connection closed')))

      /**
       * @todo We have assumed here that
       * nothing is greater than `2^53 -1`, especially `user_id` and `group_id` though they are int64.
       * If the support of numbers greater than `2^53 -1` is required,
       * file an issue and the JSON parser will be updated.
       */
      this._socket.send(JSON.stringify(payload))
    })

    return !isFinite(timeout) ? sendPromise
      : pTimeout(sendPromise, timeout, new TimeoutError(timeout, 'response timeout'))
  }

  /**
   * @internal
   */
  public handlePayload (payload: Record<string, any>): boolean {
    if (typeof payload.retcode === 'number' && typeof payload.echo !== 'undefined') {
      this._internal.emit(EVENT_API_RESPONSE, payload)
      this.emit('response', payload)
      return true
    }
    return false
  }
}
