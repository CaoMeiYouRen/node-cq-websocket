import { client as WebSocketClient } from 'websocket'
import { EventEmitter } from 'events'

import {
  BaseSocket,
  Emitter,
  Listener,
  Socket,
  EmitterRequest,
  EmitterResponse,
  EmitterRequestOptions
} from '../typedef'
import { ConnectionOptions, CQHTTPOptions } from '../typedef/options'
import { Payload } from '../utils'

export class CQAPIWebSocket extends CQWebSocketBase implements Emitter {
  public async send <P extends Payload, E = number> (
    action: string,
    params: EmitterRequest,
    options?: Partial<EmitterRequestOptions<E>>
  ): Promise<EmitterResponse<P>> {

  }
}

export class CQEventWebSocket extends (CQWebSocketBase as new () => Listener) {
}

export class CQWebSocket extends (CQAPIWebSocket as new () => Socket) {
  public async send <P extends Payload, E = number> (
    action: string,
    params: EmitterRequest,
    options?: Partial<EmitterRequestOptions<E>>
  ): Promise<EmitterResponse<P>> {

  }
}
