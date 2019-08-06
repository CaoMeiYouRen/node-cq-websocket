export type Primitive = string | number | boolean | null
export type Nullable<T> = T | null
export type Payload = Record<string, Primitive>
export interface TypedEventEmitter<M> {
  on<E extends keyof M>(event: E, listener: M[E]): this
  addListener<E extends keyof M>(event: E, listener: M[E]): this
  prependListener<E extends keyof M>(event: E, listener: M[E]): this

  once<E extends keyof M>(event: E, listener: M[E]): this
  prependOnceListener<E extends keyof M>(event: E, listener: M[E]): this

  off<E extends keyof M>(event: E, listener: M[E]): this
  removeListener<E extends keyof M>(event: E, listener: M[E]): this
  removeAllListeners<E extends keyof M>(event?: E): this
}
