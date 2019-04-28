import { EventPacket } from '../packet/EventPacket'

/**
 * @category WebSocket Driver
 */
export interface WebSocketEventEmitter {
  on (event: 'open', listener: () => void): this
  on (event: 'close', listener: (code: number, reason: string) => void): this
  on (event: 'message', listener: (pkt: EventPacket) => void): this
  on (event: 'error', listener: (err: Error) => void): this

  addListener (event: 'open', listener: () => void): this
  addListener (event: 'close', listener: (code: number, reason: string) => void): this
  addListener (event: 'message', listener: (pkt: EventPacket) => void): this
  addListener (event: 'error', listener: (err: Error) => void): this

  removeListener (event: 'open', listener: () => void): this
  removeListener (event: 'close', listener: (code: number, reason: string) => void): this
  removeListener (event: 'message', listener: (pkt: EventPacket) => void): this
  removeListener (event: 'error', listener: (err: Error) => void): this

  once (event: 'open', listener: () => void): this
  once (event: 'close', listener: (code: number, reason: string) => void): this
  once (event: 'message', listener: (pkt: EventPacket) => void): this
  once (event: 'error', listener: (err: Error) => void): this

  off (event: 'open', listener: () => void): this
  off (event: 'close', listener: (code: number, reason: string) => void): this
  off (event: 'message', listener: (pkt: EventPacket) => void): this
  off (event: 'error', listener: (err: Error) => void): this

  removeAllListeners (event: 'open' | 'close' | 'message' | 'error'): this

  emit (event: 'open'): boolean
  emit (event: 'close', code?: number, reason?: string): boolean
  emit (event: 'message', pkt: EventPacket): boolean
  emit (event: 'error', err: Error): boolean
}
