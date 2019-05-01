/**
 * @module packet.api
 */

import { ParamAPIMessage } from '../ParamAPIMessage'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=send_group_msg-发送群消息 CQHTTP#发送群消息}
 */
export interface ReqSendGroupMsg {
  group_id: number
  message: ParamAPIMessage
  auto_escape?: boolean
}
