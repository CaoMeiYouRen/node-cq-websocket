/**
 * @module Driver
 */

import { EventPacket } from '../packet/EventPacket'

export interface WebSocketEventListenerMap {
  open: () => void
  close: (code: number, reason: string) => void
  message: (pkt: EventPacket) => void
  error: (err: Error) => void
}

export type WebSocketEvent = keyof WebSocketEventListenerMap
