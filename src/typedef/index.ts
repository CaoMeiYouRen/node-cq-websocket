import { TypedEventEmitter, Payload, Nullable } from '../utils'

export interface EmitterRequestOptions<E> {
  echo: E
  timeout: number
}

export type EmitterRequest = Payload

export interface EmitterResponse<T extends Payload> {
  status: 'failed'
  retcode: number
  data: Nullable<T>
}

export type Listener = TypedEventEmitter<ListenerEvents>

export interface Emitter extends TypedEventEmitter<EmitterEvents> {
  /**
   * @see [API 列表](https://cqhttp.cc/docs/#/API?id=api-%E5%88%97%E8%A1%A8)
   */
  send <P extends Payload, E = number> (
    action: string,
    params?: Nullable<EmitterRequest>,
    options?: Partial<EmitterRequestOptions<E>>
  ): Promise<EmitterResponse<P>>
}

export type BaseSocket = TypedEventEmitter<BaseEvents>

export type Socket = Listener & Emitter
