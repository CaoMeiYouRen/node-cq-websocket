import { client as WebSocketClient } from 'websocket'
import { EventEmitter } from 'events'

import {
  WebSocketBase,
  APIWebSocket,
  EventWebSocket,
  UniversalWebSocket,
  APIResponse,
  APIRequestOptions
} from '../defs'
import { Payload, Nullable } from '../utils'

export interface CQWebSocketOptions {
  url: Nullable<string>
  protocol: 'ws' | 'wss'
  host: string
  port: number
  path: string
  accessToken: Nullable<string>
}

export class CQWebSocketBase extends EventEmitter implements WebSocketBase {
  private _options: CQWebSocketOptions = {
    url: null,
    protocol: 'ws',
    host: '127.0.0.1',
    port: 6700,
    path: '/',
    accessToken: null
  }

  public constructor (options?: Partial<CQWebSocketOptions>) {
    super()
  }
}

export class CQAPIWebSocket extends CQWebSocketBase implements APIWebSocket {
  public async send <P extends Payload, E = number> (
    action: string, options?: Partial<APIRequestOptions<E>>
  ): Promise<APIResponse<P>> {

  }
}

export class CQEventWebSocket extends (CQWebSocketBase as new () => EventWebSocket) {
}

export class CQWebSocket extends (CQAPIWebSocket as new () => UniversalWebSocket) {
  public async send <P extends Payload, E = number> (
    action: string, options?: Partial<APIRequestOptions<E>>
  ): Promise<APIResponse<P>> {

  }
}