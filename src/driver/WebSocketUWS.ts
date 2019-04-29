import { EventEmitter } from 'events'

export class WebSocketUWS extends EventEmitter implements
  Driver.Listener,
  Driver.Emitter {
  open (): void {
    throw new Error('Method not implemented.')
  }

  close (code?: number | undefined, reason?: string | undefined): void {
    throw new Error('Method not implemented.')
  }

  send (pkt: Packet.APIPacket): void {
    throw new Error('Method not implemented.')
  }
}
