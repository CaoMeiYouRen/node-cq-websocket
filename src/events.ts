interface SimpleEventEmitter<M> {
  on<E extends keyof M> (event: E, listener: M[E]): this
  addListener<E extends keyof M> (event: E, listener: M[E]): this
  prependListener<E extends keyof M> (event: E, listener: M[E]): this

  once<E extends keyof M> (event: E, listener: M[E]): this
  prependOnceListener<E extends keyof M> (event: E, listener: M[E]): this

  removeListener<E extends keyof M> (event: E, listener: M[E]): this
  removeAllListeners<E extends keyof M> (event?: E): this
}

export interface ConnectionEvents {
  close (code: number, reason: string): void
  error (err: Error): void
}

export type ConnectionEventEmitter = new () => SimpleEventEmitter<ConnectionEvents>

export interface EventConnectionEvents extends ConnectionEvents {
  message (payload: Record<string, any>): void
}

export type EventConnectionEventEmitter = new () => SimpleEventEmitter<EventConnectionEvents>

export interface APIConnectionEvents extends ConnectionEvents {
  response (payload: Record<string, any>): void
}

export type APIConnectionEventEmitter = new () => SimpleEventEmitter<APIConnectionEvents>

export interface UniversalConnectionEvents
  extends EventConnectionEvents, APIConnectionEvents {
}

export type UniversalConnectionEventEmitter = new () => SimpleEventEmitter<UniversalConnectionEvents>
