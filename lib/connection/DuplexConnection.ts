
import { Connection, WebSocketLike } from './Connection'
import { WritableConnection } from './WritableConnection'
import { ReadableConnection, ReadableConnectionEvents } from './ReadableConnection'

import { msg as msgDebug } from '../debug'

export declare interface DuplexConnection {
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

  recv (timeout?: number): Promise<Record<string, any>>
  send (payload: Record<string, any>, timeout?: number): Promise<Record<string, any>>
}

export class DuplexConnection extends Connection {
  private _messageHandlers: Array<(payload: Record<string, any>) => void> = []
  private _responseHandlerMap: Map<string, (payload: Record<string, any>) => void> = new Map()
  public requestIdLength?: number
  public requestIdGenerator?: () => string

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

    this._messagePipeline.push((payload: Record<string, any>) => {
      if (!('retcode' in payload) || typeof payload.echo !== 'string') {
        return payload
      }
      const echo = payload.echo
      const handler = this._responseHandlerMap.get(echo)
      if (!handler) { return payload }

      msgDebug('recv: %o', payload)
      delete payload.echo
      handler(payload)
      this._responseHandlerMap.delete(echo)
    })
  }

  protected _handlePayload (payload: Record<string, any>): Record<string, any> | undefined {
    return ReadableConnection.prototype._handlePayload.call(this, payload) &&
      WritableConnection.prototype._handlePayload.call(this, payload)
  }
}

// implement
DuplexConnection.prototype.recv = ReadableConnection.prototype.recv
DuplexConnection.prototype.send = WritableConnection.prototype.send
