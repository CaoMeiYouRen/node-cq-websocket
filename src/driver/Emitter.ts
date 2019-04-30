/**
 * @module Driver
 */

import { APIPacket } from '../packet/APIPacket'

export interface Emitter {
  send (pkt: APIPacket): void
}
