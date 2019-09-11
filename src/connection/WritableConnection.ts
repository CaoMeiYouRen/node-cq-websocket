import { Connection, ConnectionEvents, ConnectionInfo, WebSocketLike } from './Connection'
import { isAPIResponse, parseMessage } from '../utils'

export interface WritableConnectionEvents extends ConnectionEvents {
  response (payload: Record<string, any>): void
}

export declare interface WritableConnection {
  on<E extends keyof WritableConnectionEvents> (event: E, listener: WritableConnectionEvents[E]): this
  addListener<E extends keyof WritableConnectionEvents> (event: E, listener: WritableConnectionEvents[E]): this
  prependListener<E extends keyof WritableConnectionEvents> (event: E, listener: WritableConnectionEvents[E]): this

  once<E extends keyof WritableConnectionEvents> (event: E, listener: WritableConnectionEvents[E]): this
  prependOnceListener<E extends keyof WritableConnectionEvents> (event: E, listener: WritableConnectionEvents[E]): this

  removeListener<E extends keyof WritableConnectionEvents> (event: E, listener: WritableConnectionEvents[E]): this
  removeAllListeners<E extends keyof WritableConnectionEvents> (event?: E): this

  /**
   * @internal
   */
  emit (event: string, ...args: any[]): boolean
}

export class WritableConnection extends Connection {
  public constructor (proxy: WebSocketLike, info: ConnectionInfo) {
    super(proxy, info)
    this._proxy.on('message', (msg: string) => {
      // let payload: Record<string, any>
      // try {
      //   payload = parseMessage(msg)
      // } catch (err) {
      //   this.emit('error', err)
      //   return
      // }
      // isAPIResponse(payload)
    })
  }
}
