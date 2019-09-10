import { Connection, ConnectionEvents } from './Connection'
import { SimpleArguments } from '../events'

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
  emit <E extends keyof ReadableConnectionEvents> (event: E, ...args: SimpleArguments<ReadableConnectionEvents[E]>): boolean
}

export class ReadableConnection extends Connection {
  public constructor () {
    
  }
}
