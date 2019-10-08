
import { Connection, WebSocketLike } from './Connection'
import { WritableConnection } from './WritableConnection'
import { ReadableConnection } from './ReadableConnection'
import mergeWith from 'lodash.mergewith'

export declare interface DuplexConnection {
  requestIdLength?: number
  requestIdGenerator?: () => string
  recv (timeout?: number): Promise<Record<string, any>>
  send (payload: Record<string, any>, timeout?: number): Promise<Record<string, any>>
}

export class DuplexConnection extends Connection {
  public constructor (socket: WebSocketLike) {
    super(socket)
    mergeWith(this,
      new ReadableConnection(socket),
      new WritableConnection(socket),
      (obj: any, src: any, key: string) => key === '_messagePipeline' ? obj.concat(src)
        : [ '_messageHandlers', '_responseHandlerMap' ].includes(key) ? src
          : undefined
    )
  }
}

// implement
DuplexConnection.prototype.recv = ReadableConnection.prototype.recv
DuplexConnection.prototype.send = WritableConnection.prototype.send
