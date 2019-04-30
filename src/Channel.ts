import { EventEmitter } from 'events'
import { EventPacket } from './packet/EventPacket'

export type Filter = (pkt: EventPacket) => boolean

export class Channel extends EventEmitter {
  public constructor (private _filter: Filter) {
    super()
  }

  public handle (pkt: EventPacket): this {
    if (this._filter(pkt)) {
      this.emit('message')
    }
    return this
  }
}
