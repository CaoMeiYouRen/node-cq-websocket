/**
 * @module driver
 */

import { PacketEvent } from '../packet/event/PacketEvent'

export interface EventListener {
  on (event: 'message', listener: (pkt: PacketEvent) => void): this
  once (event: 'message', listener: (pkt: PacketEvent) => void): this
  off (event: 'message', listener?: (pkt: PacketEvent) => void): this
}
