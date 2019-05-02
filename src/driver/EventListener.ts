/**
 * @module driver
 */

import { PacketEvent } from '../packet/PacketEvent'

export interface EventListener {
  on (event: 'message', listener: (pkt: PacketEvent) => void): this
  once (event: 'message', listener: (pkt: PacketEvent) => void): this
  off (event: 'message', listener?: (pkt: PacketEvent) => void): this
}
