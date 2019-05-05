/**
 * @module driver
 */

import { PacketEvent } from '../packet/PacketEvent'
import { PacketAPIRequest, PacketAPIResponse } from '../packet/PacketAPI'

export enum DriverState {
  CONNECTING,
  OPEN,
  CLOSING,
  CLOSED
}

export enum DriverRole {
  EVENT = '/event',
  API = '/api',
  UNIVERSAL = '/'
}

export interface Driver {
  url: string
  readyState: DriverState
  role: DriverRole

  close (code?: number, reason?: string): Promise<void>
  send<R extends PacketAPIRequest> (pkt: R): Promise<PacketAPIResponse<R>>

  on (event: 'open', listener: () => void): this
  on (event: 'close', listener: (code: number, reason: string) => void): this
  on (event: 'error', listener: (err: Error) => void): this
  on (event: 'message', listener: (pkt: PacketEvent) => void): this

  once (event: 'open', listener: () => void): this
  once (event: 'close', listener: (code: number, reason: string) => void): this
  once (event: 'error', listener: (err: Error) => void): this
  once (event: 'message', listener: (pkt: PacketEvent) => void): this

  off (event: 'open', listener?: () => void): this
  off (event: 'close', listener?: (code: number, reason: string) => void): this
  off (event: 'error', listener?: (err: Error) => void): this
  off (event: 'message', listener?: (pkt: PacketEvent) => void): this
}
