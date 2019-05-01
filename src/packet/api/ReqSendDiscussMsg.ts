/**
 * @module packet.api
 */

import { ParamAPIMessage } from '../ParamAPIMessage'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=send_discuss_msg-发送讨论组消息 CQHTTP#发送讨论组消息}
 */
export interface ReqSendDiscussMsg {
  discuss_id: number
  message: ParamAPIMessage
  auto_escape?: boolean
}
