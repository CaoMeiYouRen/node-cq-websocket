import { Payload, Nullable, TypedEventEmitter } from './utils'

export interface BaseEvents {
  open (): void
  close (code: number, reason: string): void
  error (err: Error): void
}

export interface EventWebSocketEvents {
  message (ctx: Payload): void
}

export interface APIRequestOptions<E> {
  params: Payload
  echo: E
  timeout: number
}

export interface APIResponse<T extends Payload> {
  status: 'failed'
  retcode: number
  data: Nullable<T>
}

export type WebSocketBase = TypedEventEmitter<BaseEvents>

export interface APIWebSocket extends WebSocketBase {
  /**
   * @see [API 列表](https://cqhttp.cc/docs/#/API?id=api-%E5%88%97%E8%A1%A8)
   */
  send <P extends Payload, E = number> (
    action: string, options?: Partial<APIRequestOptions<E>>): Promise<APIResponse<P>>
}

export type EventWebSocket = TypedEventEmitter<BaseEvents & EventWebSocketEvents>
export type UniversalWebSocket = APIWebSocket & EventWebSocket
