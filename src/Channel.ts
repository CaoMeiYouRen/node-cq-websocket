import { EventEmitter } from 'events'

export type Filter = (pkt: Packet.EventPacket) => boolean

export class Channel extends EventEmitter {
  public constructor (private _filter: Filter) {
    super()
  }

  public handle (pkt: Packet.EventPacket): this {
    if (this._filter(pkt)) {
      this.emit('message')
    }
    return this
  }
}
