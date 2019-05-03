/**
 * @module packet.event
 */

import { ParamStatus } from '../ParamStatus'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/Post?id=心跳 CQHTTP#心跳}
 */
export interface MetaEventHeartbeat {
  post_type: 'meta_event'
  meta_event_type: 'heartbeat'
  status: ParamStatus
}
