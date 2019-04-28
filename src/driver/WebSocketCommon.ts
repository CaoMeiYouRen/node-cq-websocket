import { APIPacket } from '../packet/APIPacket'
import { WebSocketEventEmitter } from './WebSocketEventEmitter'

/**
 * A WebSocket is a one-way finite state machine with 3 states, *INITIAL* state, *OPENED* state and *CLOSED* state.
 * Once closed, the socket will never be reused.
 * If reconnecting is required, **create a new socket** instead.
 * @category WebSocket Driver
 */
export interface WebSocketCommon extends WebSocketEventEmitter {
  send (pkt: APIPacket): void
  open (): void
  close (code?: number, reason?: string): void
}
