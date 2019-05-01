/**
 * @module driver
 */

export interface Connector {
  close (code?: number, reason?: string): Promise<void>

  on (event: 'open', listener: () => void): this
  on (event: 'close', listener: (code: number, reason: string) => void): this
  on (event: 'error', listener: (err: Error) => void): this

  once (event: 'open', listener: () => void): this
  once (event: 'close', listener: (code: number, reason: string) => void): this
  once (event: 'error', listener: (err: Error) => void): this

  off (event: 'open', listener?: () => void): this
  off (event: 'close', listener?: (code: number, reason: string) => void): this
  off (event: 'error', listener?: (err: Error) => void): this
}
