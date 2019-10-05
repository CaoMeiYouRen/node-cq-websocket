import { EventEmitter } from 'events'

import { main as debug, msg as msgDebug } from '../debug'
import { MessageError } from '../errors'

export interface WebSocketLike {
  url: string
  close (code?: number, reason?: string): void
  send (msg: string): void
}

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

  /**
   * @internal
   */
  emit<E extends keyof ConnectionEvents> (event: E, ...args: any[]): boolean
}

export abstract class Connection extends EventEmitter {
  private _openedAt: Date = new Date()
  private _closed: boolean = false
  private _closedAt?: Date
  private _closeCode?: number
  private _closeReason?: string
  protected _messagePipeline: Array<(...args: any[]) => any> = []
  protected _closeHandlers: Array<(code: number, reason: string) => void> = []

  public constructor (protected _socket: WebSocketLike) {
    super()
  }

  public async close (code: number = 1000, reason?: string): Promise<{code: number, reason: string}> {
    debug('connection#close()')
    return new Promise((resolve) => {
      if (this._closed) {
        debug('connection already closed')
        return resolve({
          code: this._closeCode as number,
          reason: this._closeReason as string
        })
      }

      debug('connection closing')
      this._closeHandlers.push((code: number, reason: string) => {
        debug('connection#close() resolved')
        resolve({ code, reason })
      })
      this._socket.close(code, reason)
    })
  }

  public get url (): string {
    return this._socket.url
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
    return this._closed
  }

  /**
   * called by socket implementations to emit messages
   * @internal
   */
  public handleMessage (msg: string): void {
    msgDebug('recv data: %O', msg)
    this.emit('data', msg)

    let payload: Record<string, any>
    try {
      /**
       * @todo We have assumed here that
       * nothing is greater than `2^53 -1`, especially `user_id` and `group_id` though they are int64.
       * If the support of numbers greater than `2^53 -1` is required,
       * file an issue and the JSON parser will be updated.
       */
      payload = JSON.parse(msg)
    } catch (err) {
      this.emit('error', new MessageError(msg, `invalid JSON: ${err.message}`))
      return
    }
    if (typeof payload !== 'object') {
      this.emit('error', new MessageError(msg, 'the payload is not a JSON object'))
      return
    }

    let currentValue = payload
    for (const step of this._messagePipeline) {
      currentValue = step(currentValue)
      if (!currentValue) break
    }
    if (currentValue) {
      this.emit('error', new MessageError(msg, 'unexpected payload'))
    }
  }

  /**
   * called by socket implementations to emit closes
   * @internal
   */
  public handleClose (code: number, reason: string): void {
    debug('connection closed: %d %s', code, reason)
    this._closed = true
    this._closedAt = new Date()
    this._closeCode = code
    this._closeReason = reason

    for (const handler of this._closeHandlers) {
      handler(code, reason)
    }
    this._closeHandlers = []
    this.emit('close', code, reason)
  }

  /**
   * called by socket implementations to emit errors
   * @internal
   */
  public handleError (error: Error): void {
    debug('connection error: %s', error)
    this.emit('error', error)
  }
}
