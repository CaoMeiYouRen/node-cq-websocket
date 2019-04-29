namespace Driver {
  export interface Emitter {
    send (pkt: Packet.APIPacket): void
  }
}
