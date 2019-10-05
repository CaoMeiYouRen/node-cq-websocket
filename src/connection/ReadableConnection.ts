import pTimeout from 'p-timeout'

import {
  Connection,
  ConnectionEvents,
  WebSocketLike
} from './Connection'
import { TimeoutError, StateError, AbortError } from '../errors'
import { main as debug, msg as msgDebug } from '../debug'

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
  private _messageHandlers: Array<(payload: Record<string, any>) => void> = []
  public constructor (socket: WebSocketLike) {
    super(socket)
    this._messagePipeline.push((payload: Record<string, any>) => {
      if (!('post_type' in payload)) return payload

      msgDebug('recv event: %O', payload)
      for (const handler of this._messageHandlers) {
        handler(payload)
      }
      this._messageHandlers = []
      this.emit('message', payload)
    })
  }

  public async recv (timeout: number = Infinity): Promise<Record<string, any>> {
    debug('connection#recv()')

    const recvPromise = new Promise<Record<string, any>>((resolve, reject) => {
      if (this.closed) {
        debug('connection already closed')
        const error = new StateError('recv', 'connection already closed')
        reject(error)
        return
      }
      this._messageHandlers.push((payload) => {
        debug('connection#recv() resolved')
        resolve(payload)
      })
      this._closeHandlers.push(() => {
        debug('connection#recv() rejected')
        const error = new AbortError('recv', 'recv action aborted due to connection closed')
        reject(error)
      })
    })

    let payload: Record<string, any>
    try {
      payload = await pTimeout(recvPromise, timeout,
        new TimeoutError('recv', timeout, 'read timeout'))
    } catch (e) {
      this.emit('error', e)
      throw e
    }

    return payload
  }
}
