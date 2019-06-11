/**
 * @module transport
 */
import { strict as _assert } from 'assert'

import { StateError, MessageError } from './TransportError'
import { IMessage } from 'websocket'

export interface TransportConfig {
  accessToken?: string
}

export interface TransportEventMap {
  open (): void
  close (code: number, reason: string): void
  message (msg: string): void
  error (err: Error): void
}

export interface Transport {
  readonly readyState: TransportReadyState
  send (payload: string): void
  close (code?: number, reason?: string): void
}

export enum TransportReadyState {
  INIT = -1,
  CONNECTING,
  OPEN,
  CLOSING,
  CLOSED
}

export namespace TransportReadyState {
  export function toString (readyState: TransportReadyState): ReadableState {
    switch (readyState) {
      /* tslint:disable:no-unnecessary-qualifier */
      case TransportReadyState.INIT:
        return 'INIT'
      case TransportReadyState.CONNECTING:
        return 'CONNECTING'
      case TransportReadyState.OPEN:
        return 'OPEN'
      case TransportReadyState.CLOSING:
        return 'CLOSING'
      case TransportReadyState.CLOSED:
        return 'CLOSED'
      /* tslint:enable:no-unnecessary-qualifier */
    }
  }

  export type ReadableState = 'INIT' | 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED'

  export function assert (current: TransportReadyState,
    expected: TransportReadyState[]) {
    _assert(expected.includes(current), new StateError(current, expected))
  }
}

export namespace TransportMessage {
  export function assert (msg: IMessage) {
    _assert(msg.type === 'utf8', new MessageError(`unexpected non-utf8 message`))
  }
}
