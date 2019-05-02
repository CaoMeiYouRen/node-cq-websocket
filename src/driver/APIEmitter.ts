/**
 * @module driver
 */

import { PacketAPIRequest, PacketAPIResponse } from '../packet/PacketAPI'

export interface APIEmitter {
  send<R extends PacketAPIRequest> (pkt: R): Promise<PacketAPIResponse<R>>
}
