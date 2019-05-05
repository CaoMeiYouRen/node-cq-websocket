/**
 * @module driver
 */

import { RequestOptions } from 'https'
import { EventEmitter } from 'events'
import {
  client as WebSocketClient,
  connection as WebSocketConnection,
  IClientConfig
} from 'websocket'

import { Driver, DriverState, DriverRole } from './Driver'
import { PacketAPIRequest, PacketAPIResponse } from '../packet/PacketAPI'
import { MessageError } from '../errors'

export interface DriverOptions {
  role: DriverRole
  accessToken: string
  clientOptions: IClientConfig
  requestOptions: RequestOptions
}

export class WebSocketNode extends EventEmitter implements Driver {
  public role: DriverRole = DriverRole.UNIVERSAL
  private socket: WebSocketConnection | null = null
  private closing: boolean = false

  public get readyState () {
    return this.socket && this.socket.closeReasonCode >= 0 ? DriverState.CLOSED
      : this.closing ? DriverState.CLOSING
        : this.socket ? DriverState.OPEN
          : DriverState.CONNECTING
  }

  constructor (
    public url: string,
    {
      role,
      accessToken,
      clientOptions,
      requestOptions
    }: Partial<DriverOptions> = {}
  ) {
    super()

    this.role = role || this.role

    const client = new WebSocketClient({
      fragmentOutgoingMessages: false,
      ...clientOptions
    })
      .on('connect', (connection) => {
        this.socket = connection
          .on('message', (msg) => {
            if (msg.utf8Data) {
              let msgObj
              try {
                msgObj = JSON.parse(msg.utf8Data)
              } catch (err) {
                this.emit('error', new MessageError(err.message))
                return
              }
              this.emit('message', msgObj)
            } else {
              this.emit('error', new MessageError('Unexpected non-UTF8 message'))
              return
            }
          })
          .on('close', (code, reason) => {
            this.emit('close', code, reason)
          })
          .on('error', (err) => {
            this.emit('error', err)
          })
      })
      .on('connectFailed', (err) => {
        this.emit('error', err)
      })

    // try connecting on next tick
    setImmediate(
      (headers, requestOptions) => {
        client.connect(url, undefined, undefined, headers, requestOptions)
      },
      accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
      requestOptions
    )
  }

  send<R extends PacketAPIRequest> (pkt: R): Promise<PacketAPIResponse<R>> {
    if (this.socket && !this.closing) {
      this.socket.sendUTF(JSON.stringify(pkt))
    }
  }

  close (code?: number, reason?: string): Promise<void> {
    if (this.socket && !this.closing) {
      this.closing = true
      const close = this.socket.close as (code?: number, reason?: string) => void
      close.call(this.socket, code, reason)
    }
    return new Promise((resolve) => {
      this.once('close', resolve)
    })
  }
}
