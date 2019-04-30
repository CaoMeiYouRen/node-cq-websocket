/**
 * @module Driver
 */

import { EventEmitter } from 'events'
import { client as WebSocketClient, IClientConfig } from 'websocket'

import { Emitter } from './Emitter'
import { Listener } from './Listener'
import { APIPacket } from '../packet/APIPacket'

export interface WebSocketNodeOptions
  extends IClientConfig {

}

export class WebSocketNode extends EventEmitter implements Listener, Emitter {
  private _client: WebSocketClient
  constructor (wsConfig?: IClientConfig) {
    super()
    this._client = new WebSocketClient({
      fragmentOutgoingMessages: false,
      ...wsConfig
    })
  }

  open (): void {
    // this._client.connect(url)
  }

  close (code?: number | undefined, reason?: string | undefined): void {
    throw new Error('Method not implemented.')
  }

  send (pkt: APIPacket): void {
    throw new Error('Method not implemented.')
  }
}
