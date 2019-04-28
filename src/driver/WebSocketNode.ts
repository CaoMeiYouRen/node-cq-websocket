import { EventEmitter } from 'events'
import { client as WebSocketClient, IClientConfig } from 'websocket'
import { WebSocketCommon } from './WebSocketCommon'
import { APIPacket } from '../packet/APIPacket'

/**
 * @category WebSocket Driver
 */
export class WebSocketNode extends EventEmitter implements WebSocketCommon {

  open (): void {
    throw new Error('Method not implemented.')
  }

  close (code?: number | undefined, reason?: string | undefined): void {
    throw new Error('Method not implemented.')
  }

  private _client: WebSocketClient
  constructor (wsConfig?: IClientConfig) {
    super()
    this._client = new WebSocketClient({
      fragmentOutgoingMessages: false,
      ...wsConfig
    })
  }

  send (pkt: APIPacket): void {
    throw new Error('Method not implemented.')
  }
}
