/**
 * @module Driver
 */

import { EventPacket } from '../packet/EventPacket'

export interface Listener {
  on (event: 'open', listener: () => void): this
  on (event: 'close', listener: (code: number, reason: string) => void): this
  on (event: 'message', listener: (pkt: EventPacket) => void): this
  on (event: 'error', listener: (err: Error) => void): this

  once (event: 'open', listener: () => void): this
  once (event: 'close', listener: (code: number, reason: string) => void): this
  once (event: 'message', listener: (pkt: EventPacket) => void): this
  once (event: 'error', listener: (err: Error) => void): this

  off (event: 'open', listener?: () => void): this
  off (event: 'close', listener?: (code: number, reason: string) => void): this
  off (event: 'message', listener?: (pkt: EventPacket) => void): this
  off (event: 'error', listener?: (err: Error) => void): this

  emit (event: 'open'): boolean
  emit (event: 'close', code?: number, reason?: string): boolean
  emit (event: 'message', pkt: EventPacket): boolean
  emit (event: 'error', err: Error): boolean
}
