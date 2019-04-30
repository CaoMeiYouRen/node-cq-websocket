/**
 * @module Driver
 */

import { EventEmitter } from 'events'

import { Emitter } from './Emitter'
import { Listener } from './Listener'
import { APIPacket } from '../packet/APIPacket'

export class WebSocketUWS extends EventEmitter implements Listener, Emitter {
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
