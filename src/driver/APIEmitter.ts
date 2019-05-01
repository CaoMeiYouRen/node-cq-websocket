/**
 * @module driver
 */

import { APIPacket } from '../packet/APIPacket'

export interface APIEmitter {
  send (pkt: APIPacket): Promise<any>
}
