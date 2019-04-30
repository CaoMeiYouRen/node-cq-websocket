/**
 * @module Driver
 */

import { Emitter } from './Emitter'
import { Listener } from './Listener'
import { EventPacket } from '../packet/EventPacket'
import { APIPacket } from '../packet/APIPacket'

export class WebSocketBrowser implements Listener, Emitter {
  on (event: 'open', listener: () => void): this
  on (event: 'close', listener: (code: number, reason: string) => void): this
  on (event: 'message', listener: (pkt: EventPacket) => void): this
  on (event: 'error', listener: (err: Error) => void): this
  on (event: any, listener: any): this {
    throw new Error('Method not implemented.')
  }

  once (event: 'open', listener: () => void): this
  once (event: 'close', listener: (code: number, reason: string) => void): this
  once (event: 'message', listener: (pkt: EventPacket) => void): this
  once (event: 'error', listener: (err: Error) => void): this
  once (event: any, listener: any): this {
    throw new Error('Method not implemented.')
  }

  off (event: 'open', listener?: (() => void) | undefined): this
  off (event: 'close', listener?: ((code: number, reason: string) => void) | undefined): this
  off (event: 'message', listener?: ((pkt: EventPacket) => void) | undefined): this
  off (event: 'error', listener?: ((err: Error) => void) | undefined): this
  off (event: any, listener?: any): this {
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
