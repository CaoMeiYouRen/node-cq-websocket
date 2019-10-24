import { EventEmitter } from 'events'
import { MessageError } from '../errors'
import {
  MessageEvent,
  CloseEvent,
  ErrorEvent
} from '../events'

export interface ConnectionEvents {
  data (msg: string): void
  close (code: number, reason: string): void
  error (err: Error): void
}

export declare interface Connection {
  on<E extends keyof ConnectionEvents> (event: E, listener: ConnectionEvents[E]): this
  addListener<E extends keyof ConnectionEvents> (event: E, listener: ConnectionEvents[E]): this
  prependListener<E extends keyof ConnectionEvents> (event: E, listener: ConnectionEvents[E]): this

  once<E extends keyof ConnectionEvents> (event: E, listener: ConnectionEvents[E]): this
  prependOnceListener<E extends keyof ConnectionEvents> (event: E, listener: ConnectionEvents[E]): this

  removeListener<E extends keyof ConnectionEvents> (event: E, listener: ConnectionEvents[E]): this
  removeAllListeners<E extends keyof ConnectionEvents> (event?: E): this
}

export class Connection extends EventEmitter {
  public handleMessage (msg: string | Record<string, null>): void {
    let payload: Record<string, any>
    if (typeof event.data === 'string') {
      try {
        payload = JSON.parse(event.data)
      } catch (e) {
        this.emit('error', new MessageError(event.data, `invalid json: ${e.message}`))
        return
      }
    } else {
      payload = event.data
    }

    if (typeof msg !== 'object') {
      this.emit('error', new MessageError(payload, 'non-object message'))
      return
    }

    event.payload = payload
  }

  protected _handleClose () 

  public dispatch (event: Event): void {
    if (event instanceof MessageEvent) {
      this._handleMessage(event)
      return
    }

    if (event instanceof CloseEvent) {
      return
    }

    if (event instanceof ErrorEvent) {
      // return
    }
  }
}