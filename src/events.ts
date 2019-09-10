/**
 * @internal
 */
type SimpleArguments<T> = T extends (...args: infer P) => any ? P : never

export interface SimpleEventEmitter<M> {
  on<E extends keyof M> (event: E, listener: M[E]): this
  addListener<E extends keyof M> (event: E, listener: M[E]): this
  prependListener<E extends keyof M> (event: E, listener: M[E]): this

  once<E extends keyof M> (event: E, listener: M[E]): this
  prependOnceListener<E extends keyof M> (event: E, listener: M[E]): this

  removeListener<E extends keyof M> (event: E, listener: M[E]): this
  removeAllListeners<E extends keyof M> (event?: E): this

  /**
   * @internal
   */
  emit <E extends keyof M> (event: E, ...args: SimpleArguments<M[E]>): boolean
}

export interface ConnectionEvents {
  close (code: number, reason: string): void
  error (err: Error): void
}

export type ConnectionEventEmitter = new () => SimpleEventEmitter<ConnectionEvents>

export interface ReadableConnectionEvents extends ConnectionEvents {
  message (payload: Record<string, any>): void
}

export type ReadableConnectionEventEmitter = new () => SimpleEventEmitter<ReadableConnectionEvents>

export interface WritableConnectionEvents extends ConnectionEvents {
  response (payload: Record<string, any>): void
}

export type WritableConnectionEventEmitter = new () => SimpleEventEmitter<WritableConnectionEvents>

export interface DuplexConnectionEvents
  extends ReadableConnectionEvents, WritableConnectionEvents {
}

export type DuplexConnectionEventEmitter = new () => SimpleEventEmitter<DuplexConnectionEvents>
