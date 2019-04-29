namespace Driver {
  export interface WebSocketEventListenerMap {
    open: () => void
    close: (code: number, reason: string) => void
    message: (pkt: Packet.EventPacket) => void
    error: (err: Error) => void
  }
  export type WebSocketEvent = keyof WebSocketEventListenerMap
}
