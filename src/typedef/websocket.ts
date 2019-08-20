export type EventListener = (evt: Event) => void
export type MessageEventListener = (msg: MessageEvent) => void
export type CloseEventListener = (msg: CloseEvent) => void

export interface WebSocketLike {
  addEventListener (event: 'open' | 'error', listener: EventListener, options?: AddEventListenerOptions): void
  addEventListener (event: 'message', listener: MessageEventListener, options?: AddEventListenerOptions): void
  addEventListener (event: 'close', listener: CloseEventListener, options?: AddEventListenerOptions): void
  removeEventListener (event: 'open' | 'error', listener: EventListener): void
  removeEventListener (event: 'message', listener: MessageEventListener): void
  removeEventListener (event: 'close', listener: CloseEventListener): void
  send (msg: string): void
  close (code?: number, reason?: string): void
}
