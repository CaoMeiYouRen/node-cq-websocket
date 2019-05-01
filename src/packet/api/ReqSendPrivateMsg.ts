/**
 * @module packet.api
 */

import { ParamAPIMessage } from '../ParamAPIMessage'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=send_private_msg-发送私聊消息 CQHTTP#发送私聊消息}
 */
export interface ReqSendPrivateMsg {
  user_id: number
  message: ParamAPIMessage
  auto_escape?: boolean
}
