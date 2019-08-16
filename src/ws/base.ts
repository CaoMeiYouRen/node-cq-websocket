import { EventEmitter } from 'events'
import { RequestOptions } from 'https'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

import { BaseSocket } from '../typedef'
import { ConnectionOptions, WebSocketBaseOptions } from '../typedef/options'

export abstract class WebSocketBase extends EventEmitter implements BaseSocket {
  public static readonly defaults: ConnectionOptions = {
    host: '127.0.0.1',
    port: 6700,
    path: '',
    protocol: 'ws'
  }

  private _url: string
  private _accessToken?: string
  private _secret?: string

  /* eslint-disable no-dupe-class-members */
  public constructor (url: string, options?: Partial<WebSocketBaseOptions>)
  public constructor (options?: Partial<ConnectionOptions>)
  public constructor (
    arg1?: string | Partial<ConnectionOptions>,
    arg2?: Partial<WebSocketBaseOptions>
  ) { /* eslint-enable no-dupe-class-members */
    super()

    if (typeof arg1 === 'string') {
      this._url = arg1
      this._accessToken = arg2 ? arg2.accessToken : undefined
      this._secret = arg2 ? arg2.secret : undefined
    } else {
      const options = Object.assign({}, WebSocketBase.defaults, arg1)
      this._url = this._getRemoteURL(options)
      this._accessToken = options.accessToken
      this._secret = options.secret
    }
  }

  public async connect (options: RequestOptions): Promise<void> {
    const headers = {}
    new W3CWebSocket(this._url, undefined, undefined, headers, options, {})
  }

  protected _getRemoteURL (remote: ConnectionOptions): string {
    return `${remote.protocol}://${remote.host}:${remote.port}${remote.path}`
  }
}
