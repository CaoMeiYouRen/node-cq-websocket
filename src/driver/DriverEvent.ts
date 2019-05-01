/**
 * @module driver
 */

import { EventPacket } from '../packet/event/PacketEvent'

export interface DriverEventListenerMap {
  open: () => void
  close: (code: number, reason: string) => void
  message: (pkt: EventPacket) => void
  error: (err: Error) => void
}

export type DriverEvent = keyof DriverEventListenerMap
