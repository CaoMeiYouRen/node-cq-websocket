/**
 * @module transport
 */
/**
 */

export enum TransportState {
  CONNECTING,
  OPEN,
  CLOSING,
  CLOSED
}

export interface TransportConfig {
  url: string
  accessToken?: string
}

export interface Transport {
  readyState: TransportState

  close (code?: number, reason?: string): void
  send (payload: string): void

  on (event: 'open', listener: () => void): this
  on (event: 'close', listener: (code: number, reason: string) => void): this
  on (event: 'error', listener: (err: Error) => void): this
  on (event: 'message', listener: (pkt: string) => void): this

  once (event: 'open', listener: () => void): this
  once (event: 'close', listener: (code: number, reason: string) => void): this
  once (event: 'error', listener: (err: Error) => void): this
  once (event: 'message', listener: (pkt: string) => void): this

  off (event: 'open', listener?: () => void): this
  off (event: 'close', listener?: (code: number, reason: string) => void): this
  off (event: 'error', listener?: (err: Error) => void): this
  off (event: 'message', listener?: (pkt: string) => void): this
}
