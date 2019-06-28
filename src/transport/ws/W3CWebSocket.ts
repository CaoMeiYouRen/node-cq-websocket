/**
 * @module transport.ws
 */
import { w3cwebsocket as WebSocket } from 'websocket'
import { Transport } from '../Transport'

export class W3CWebSocket extends Transport {
  private socket: WebSocket

  constructor (
    public url: string,
  ) {
    super()

    this.socket = new WebSocket(url, undefined, undefined, )
  }

  send (payload: string): void {
    throw new Error('Method not implemented.')
  }
}
