import { EventEmitter } from 'events'
import { WebSocketCommon } from './WebSocketCommon'
import { APIPacket } from '../packet/APIPacket'

/**
 * @category WebSocket Driver
 */
export class WebSocketUWS extends EventEmitter implements WebSocketCommon {
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
