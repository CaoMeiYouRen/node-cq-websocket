import { EventEmitter } from 'events'

import { main as debug, msg as msgDebug } from '../debug'
import { parseMessage } from '../utils'
import { MessageError } from '../errors'

export interface WebSocketLike extends EventEmitter {
  emit (event: 'message', msg: string): boolean
  emit (event: 'close', code: number, reason: string): boolean
  emit (event: 'error', err: Error): boolean
  /**
   * @internal
   */
  emit (event: string|Symbol, ...args: any[]): boolean
  send (msg: string): void
  close (code?: number, reason?: string): void
}

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
  emit (event: string, ...args: any[]): boolean
}

export abstract class Connection extends EventEmitter {
  protected static MESSAGE_PARSE = Symbol('message_parse')
  private _openedAt: Date = new Date()
  private _closedAt?: Date
  private _closeCode?: number
  private _closeReason?: string

  public constructor (protected _proxy: WebSocketLike, public info: ConnectionInfo) {
    super() // eslint-disable-line constructor-super
    this._proxy.on('close', (code: number, reason: string) => {
      debug('connection closed: %d %s', code, reason)
      this._closedAt = new Date()
      this._closeCode = code
      this._closeReason = reason
      this._proxy.removeAllListeners()
      this.emit('close', code, reason)
    })
    this._proxy.on('error', (err: Error) => {
      debug('connection error: %s', err)
      this.emit('error', err)
    })
    this._proxy.on('message', (msg: string) => {
      msgDebug('recv: %s', msg)
      this.emit('data', msg)
      let payload: Record<string, any>
      try {
        payload = parseMessage(msg)
      } catch (err) {
        this.emit('error', err)
        return
      }
      if (typeof payload !== 'object') {
        const msgError = new MessageError(msg, 'the payload is not a JSON object')
        this.emit('error', msgError)
        return
      }
      this._proxy.emit(Connection.MESSAGE_PARSE, payload)
    })
    debug('connection opened')
  }

  public async close (code: number = 1000, reason: string = 'normal closure'): Promise<{code: number, reason: string}> {
    debug('connection#close()')

    if (this.closed) {
      debug('connection already closed')
      return Promise.resolve({
        code: this._closeCode as number,
        reason: this._closeReason as string
      })
    }

    debug('connection closing')
    return new Promise((resolve) => {
      this._proxy.once('close', (code: number, reason: string) => {
        resolve({ code, reason })
      })
      this._proxy.close(code, reason)
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

  public get closeCode (): number | undefined {
    return this._closeCode
  }

  public get closeReason (): string | undefined {
    return this._closeReason
  }

  public get closed (): boolean {
    return typeof this._closeCode !== 'number'
  }
}
