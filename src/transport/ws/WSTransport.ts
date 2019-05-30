/**
 * @module transport.ws
 */
import { TransportConfig, TransportEventMap } from '../Transport'

export interface WSTransportConfig extends TransportConfig {
  url: string
  autoConnect?: boolean
  reconnection?: boolean
  reconnectionAttempts?: number
  reconnectionDelay?: number
}

export interface WSTransportEventMap extends TransportEventMap {
  reconnect (attempts: number): void
}
