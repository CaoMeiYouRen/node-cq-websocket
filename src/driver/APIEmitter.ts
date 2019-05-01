/**
 * @module driver
 */

import { PacketRequest } from '../packet/PacketRequest'
import { PacketResponse } from '../packet/PacketResponse'

export interface APIEmitter {
  send (pkt: PacketRequest): Promise<PacketResponse>
}
