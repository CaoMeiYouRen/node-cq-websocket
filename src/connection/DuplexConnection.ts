
import { Connection, WebSocketLike } from './Connection'
import { WritableConnection } from './WritableConnection'
import { ReadableConnection } from './ReadableConnection'

export declare interface DuplexConnection {
  recv (timeout?: number): Promise<Record<string, any>>
  send (payload: Record<string, any>, timeout?: number): Promise<Record<string, any>>
}

export class DuplexConnection extends Connection {
  public constructor (socket: WebSocketLike) {
    super(socket)
    ReadableConnection.call(this as any, socket)
    WritableConnection.call(this as any, socket)
  }
}

// implement
DuplexConnection.prototype.recv = ReadableConnection.prototype.recv
DuplexConnection.prototype.send = WritableConnection.prototype.send
