import pTimeout from 'p-timeout'
import nanoid from 'nanoid'

import { Connection, WebSocketLike } from './Connection'
import { main as debug, msg as msgDebug } from '../debug'
import {
  Action,
  TimeoutError,
  AbortError,
  StateError,
  UnhandledReponseError } from '../errors'

export type EchoGenerator = () => string

export interface ResponsePayload {
  retcode: number
  echo: string
}

export interface WritableConnectionOptions {
  echo: number | EchoGenerator
}

export class WritableConnection extends Connection {
  private _responseHandlerMap: Map<string, (payload: Record<string, any>) => void> = new Map()
  private _generateEcho: EchoGenerator = () => nanoid()

  public constructor (
    socket: WebSocketLike,
    options: Partial<WritableConnectionOptions> = {}
  ) {
    super(socket)
    this._addPayloadHandler((payload: Record<string, any>) => this._handlePayload(payload))
    this._generateEcho = typeof options.echo === 'number'
      ? () => nanoid(options.echo as number) : (options.echo || this._generateEcho)
  }

  public async send (
    payload: Record<string, any>,
    timeout: number = Infinity
  ): Promise<Record<string, any>> {
    debug('connection#send()')

    const echo = this._generateEcho()
    const payloadWithId = { ...payload, echo }

    const sendPromise = new Promise<Record<string, any>>((resolve, reject) => {
      if (this.closed) {
        debug('connection already closed')
        const error = new StateError(Action.SEND,
          'connection already closed')
        reject(error)
        return
      }
      this._responseHandlerMap.set(echo, (response) => {
        debug('connection#send() resolved')
        resolve(response)
      })
      this._addCloseHandler(() => {
        debug('connection#send() rejected')
        const error = new AbortError(Action.SEND,
          'send action aborted due to connection closed')
        reject(error)
      })

      /**
       * @todo We have assumed here that
       * nothing is greater than `2^53 -1`, especially `user_id` and `group_id` though they are int64.
       * If the support of numbers greater than `2^53 -1` is required,
       * file an issue and the JSON parser will be updated.
       */
      this._socket.send(JSON.stringify(payloadWithId))
      msgDebug('send request: %O', payloadWithId)
    })

    let response: Record<string, any>
    try {
      response = await pTimeout(sendPromise, timeout,
        new TimeoutError(Action.SEND, timeout, 'response timeout'))
    } catch (e) {
      this.emit('error', e)
      throw e
    }

    return response
  }

  /**
   * Mainly to be called by DuplexConnection
   * @internal
   */
  public _handlePayload (payload: Record<string, any>): Record<string, any> | undefined {
    if (!WritableConnection.isResponsePayload(payload)) {
      return payload
    }

    msgDebug('recv response: %o', payload)

    const echo = payload.echo
    const handler = this._responseHandlerMap.get(echo)
    if (!handler) {
      this.emit('error', new UnhandledReponseError(payload))
      return
    }
    delete payload.echo
    handler(payload)
    this._responseHandlerMap.delete(echo)
  }

  public static isResponsePayload (payload: any): payload is ResponsePayload {
    return typeof payload === 'object' &&
      typeof payload.retcode === 'number' &&
      typeof payload.echo === 'string'
  }
}
