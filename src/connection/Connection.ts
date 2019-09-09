import { EventEmitter } from 'events'
import { ConnectionEventEmitter } from '../events'

export class Connection extends (EventEmitter as ConnectionEventEmitter) {
  public constructor (
    private _close: (code: number, reason: string) => void
  ) {
    super() // eslint-disable-line constructor-super
  }

  public close (code: number = 1000, reason: string = 'normal closure'): Promise<void> {
    this._close(code, reason)
  }
}
