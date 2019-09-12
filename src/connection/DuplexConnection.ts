
import { Connection, WebSocketLike, EVENT_MESSAGE_PARSE } from './Connection'
import { WritableConnection, WritableConnectionEvents } from './WritableConnection'
import { ReadableConnection, ReadableConnectionEvents } from './ReadableConnection'

export interface DuplexConnectionEvents
  extends WritableConnectionEvents, ReadableConnectionEvents {
}

export declare interface DuplexConnection {
  on<E extends keyof DuplexConnectionEvents> (event: E, listener: DuplexConnectionEvents[E]): this
  addListener<E extends keyof DuplexConnectionEvents> (event: E, listener: DuplexConnectionEvents[E]): this
  prependListener<E extends keyof DuplexConnectionEvents> (event: E, listener: DuplexConnectionEvents[E]): this

  once<E extends keyof DuplexConnectionEvents> (event: E, listener: DuplexConnectionEvents[E]): this
  prependOnceListener<E extends keyof DuplexConnectionEvents> (event: E, listener: DuplexConnectionEvents[E]): this

  removeListener<E extends keyof DuplexConnectionEvents> (event: E, listener: DuplexConnectionEvents[E]): this
  removeAllListeners<E extends keyof DuplexConnectionEvents> (event?: E): this

  recv (timeout?: number): Promise<Record<string, any>>
  send (payload: Record<string, any>, timeout?: number): Promise<Record<string, any>>

  /**
   * @internal
   */
  emit<E extends keyof DuplexConnectionEvents> (event: E, ...args: any[]): boolean
}

export class DuplexConnection extends Connection {
  public constructor (socket: WebSocketLike) {
    super(socket)
    this._internal.on(EVENT_MESSAGE_PARSE, (payload) => {
      this.handlePayload(payload)
    })
  }

  /**
   * @internal
   */
  public handlePayload (payload: Record<string, any>): boolean {
    return ReadableConnection.prototype.handlePayload.call(this, payload) ||
      WritableConnection.prototype.handlePayload.call(this, payload)
  }
}

// implement
DuplexConnection.prototype.recv = ReadableConnection.prototype.recv
DuplexConnection.prototype.send = WritableConnection.prototype.send
