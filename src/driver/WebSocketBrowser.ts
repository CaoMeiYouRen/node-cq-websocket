import { WebSocketCommon } from './WebSocketCommon'
import { APIPacket } from '../packet/APIPacket'
import { EventPacket } from '../packet/EventPacket'

/**
 * @category WebSocket Driver
 */
export class WebSocketBrowser implements WebSocketCommon {
  on (event: 'open', listener: () => void): this
  on (event: 'close', listener: (code: number, reason: string) => void): this
  on (event: 'message', listener: (pkt: EventPacket) => void): this
  on (event: 'error', listener: (err: Error) => void): this
  on (event: any, listener: any): this {
    throw new Error('Method not implemented.')
  }

  addListener (event: 'open', listener: () => void): this
  addListener (event: 'close', listener: (code: number, reason: string) => void): this
  addListener (event: 'message', listener: (pkt: EventPacket) => void): this
  addListener (event: 'error', listener: (err: Error) => void): this
  addListener (event: any, listener: any): this {
    throw new Error('Method not implemented.')
  }

  removeListener (event: 'open', listener: () => void): this
  removeListener (event: 'close', listener: (code: number, reason: string) => void): this
  removeListener (event: 'message', listener: (pkt: EventPacket) => void): this
  removeListener (event: 'error', listener: (err: Error) => void): this
  removeListener (event: any, listener: any): this {
    throw new Error('Method not implemented.')
  }

  once (event: 'open', listener: () => void): this
  once (event: 'close', listener: (code: number, reason: string) => void): this
  once (event: 'message', listener: (pkt: EventPacket) => void): this
  once (event: 'error', listener: (err: Error) => void): this
  once (event: any, listener: any): this {
    throw new Error('Method not implemented.')
  }

  off (event: 'open', listener: () => void): this
  off (event: 'close', listener: (code: number, reason: string) => void): this
  off (event: 'message', listener: (pkt: EventPacket) => void): this
  off (event: 'error', listener: (err: Error) => void): this
  off (event: any, listener: any): this {
    throw new Error('Method not implemented.')
  }

  removeAllListeners (event: 'open' | 'close' | 'message' | 'error'): this {
    throw new Error('Method not implemented.')
  }

  emit (event: 'open'): boolean
  emit (event: 'close', code?: number, reason?: string): boolean
  emit (event: 'message', pkt: EventPacket): boolean
  emit (event: 'error', err: Error): boolean
  emit (event: any, code?: any, reason?: any): boolean {
    throw new Error('Method not implemented.')
  }

  open (): void {
    throw new Error('Method not implemented.')
  }

  close (code?: number | undefined, reason?: string | undefined): void {
    throw new Error('Method not implemented.')
  }

  send (pkt: APIPacket): void {
    throw new Error('Method not implemented.')
  }
}
