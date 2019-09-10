import { EventEmitter } from 'events'

import debug from '../debug'
import { SimpleArguments } from '../events'
import { DriverError } from '../errors'

export interface ConnectionInfo {
  url: string
}

export interface ConnectionEvents {
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

  /**
   * @internal
   */
  emit <E extends keyof ConnectionEvents> (event: E, ...args: SimpleArguments<ConnectionEvents[E]>): boolean
}

export class Connection extends EventEmitter {
  private _openedAt: Date = new Date()
  private _closedAt?: Date

  public constructor (
    protected _proxy: EventEmitter,
    public info: ConnectionInfo
  ) {
    super() // eslint-disable-line constructor-super
    this._proxy.on('close', (code: number, reason: string) => {
      debug('Connection: event "close": %O', { code, reason })
      this._closedAt = new Date()
      this._proxy.removeAllListeners()
      this.emit('close', code, reason)
    })
    this._proxy.on('error', (err: Error) => {
      debug('Connection: event "error": %O', err)
      this.emit('error', err)
    })
  }

  public async close (
    code: number = 1000, reason: string = 'normal closure'
  ): Promise<{code: number, reason: string}> {
    return new Promise((resolve, reject) => {
      this._proxy.once('close', (code: number, reason: string) => {
        debug('Connection: close promise resolved')
        resolve({ code, reason })
      })
      const emission = this._proxy.emit('close()', code, reason)
      if (!emission) {
        reject(new DriverError('close() is not implemented'))
      }
    })
  }

  public get url (): string {
    return this.info.url
  }

  public get openedAt (): Date {
    return this._openedAt
  }

  public get closedAt (): Date | undefined {
    return this._closedAt
  }

  public get closed (): boolean {
    return typeof this._closedAt !== 'undefined'
  }
}
