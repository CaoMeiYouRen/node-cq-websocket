import { EventEmitter } from 'events'
import { PacketEvent } from './packet/event/PacketEvent'

export type Filter = (pkt: PacketEvent) => boolean

export class Channel extends EventEmitter {
  public constructor (private _filter: Filter) {
    super()
  }

  public handle (pkt: PacketEvent): this {
    if (this._filter(pkt)) {
      this.emit('message')
    }
    return this
  }
}
