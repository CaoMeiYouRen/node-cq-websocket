/**
 * @internal
 */
export type SimpleArguments<T> = T extends (...args: infer P) => any ? P : never

export interface ReadableConnectionEvents extends ConnectionEvents {
  message (payload: Record<string, any>): void
}

export interface WritableConnectionEvents extends ConnectionEvents {
  response (payload: Record<string, any>): void
}

export interface DuplexConnectionEvents
  extends ReadableConnectionEvents, WritableConnectionEvents {
}
