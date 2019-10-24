import { Connection, ConnectionEvents } from './connection'
import { MessageEvent } from '../events'

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

export class EventConnection extends Connection {
  protected _handleMessage (event: MessageEvent): void {
    super._handleMessage(event)
    if (typeof event.payload === 'object') {
      this.emit('message', event.payload)
    }
  }
}
