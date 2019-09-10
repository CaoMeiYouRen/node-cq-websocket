import { Connection, ConnectionEvents } from './Connection'
import { SimpleArguments } from '../events'

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
  emit <E extends keyof WritableConnectionEvents> (event: E, ...args: SimpleArguments<WritableConnectionEvents[E]>): boolean
}

export class WritableConnection extends Connection {

}
