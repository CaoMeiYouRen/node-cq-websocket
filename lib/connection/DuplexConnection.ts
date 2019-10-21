import nanoid from 'nanoid'
import { Connection, WebSocketLike } from './Connection'
import {
  EchoGenerator,
  WritableConnection,
  WritableConnectionOptions } from './WritableConnection'
import {
  ReadableConnection,
  ReadableConnectionEvents } from './ReadableConnection'

export declare interface DuplexConnection {
  on<E extends keyof ReadableConnectionEvents> (event: E, listener: ReadableConnectionEvents[E]): this
  addListener<E extends keyof ReadableConnectionEvents> (event: E, listener: ReadableConnectionEvents[E]): this
  prependListener<E extends keyof ReadableConnectionEvents> (event: E, listener: ReadableConnectionEvents[E]): this

  once<E extends keyof ReadableConnectionEvents> (event: E, listener: ReadableConnectionEvents[E]): this
  prependOnceListener<E extends keyof ReadableConnectionEvents> (event: E, listener: ReadableConnectionEvents[E]): this

  removeListener<E extends keyof ReadableConnectionEvents> (event: E, listener: ReadableConnectionEvents[E]): this
  removeAllListeners<E extends keyof ReadableConnectionEvents> (event?: E): this

  /**
   * @internal
   */
  emit<E extends keyof ReadableConnectionEvents> (event: E, ...args: any[]): boolean

  recv (timeout?: number): Promise<Record<string, any>>
  send (payload: Record<string, any>, timeout?: number): Promise<Record<string, any>>
}

export class DuplexConnection extends Connection {
  private _messageHandlers: Array<(payload: Record<string, any>) => void> = []
  private _responseHandlerMap: Map<string, (payload: Record<string, any>) => void> = new Map()
  private _generateEcho: EchoGenerator = () => nanoid()

  public constructor (
    socket: WebSocketLike,
    options: Partial<WritableConnectionOptions> = {}
  ) {
    super(socket)
    this._addPayloadHandler((payload) => ReadableConnection.prototype._handlePayload.call(this, payload))
    this._addPayloadHandler((payload) => WritableConnection.prototype._handlePayload.call(this, payload))
    this._generateEcho = typeof options.echo === 'number'
      ? () => nanoid(options.echo as number) : (options.echo || this._generateEcho)
  }
}

// implement
DuplexConnection.prototype.recv = ReadableConnection.prototype.recv
DuplexConnection.prototype._addMessageHandler = ReadableConnection.prototype._addMessageHandler
DuplexConnection.prototype._invokeMessageHandlers = ReadableConnection.prototype._invokeMessageHandlers
DuplexConnection.prototype.send = WritableConnection.prototype.send
