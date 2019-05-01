/**
 * @module packet.api
 */

import { ParamAPIMessage } from '../ParamAPIMessage'

/**
 * For better typings, use [[ReqSendPrivateMsg]], [[ReqSendGroupMsg]] or [[ReqSendDiscussMsg]] instead.
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=send_msg-发送消息 CQHTTP#发送消息}
 */
export interface ReqSendMsg {
  message_type?: 'private' | 'group' | 'discuss'
  user_id?: number
  discuss_id?: number
  group_id?: number
  message: ParamAPIMessage
  auto_escape?: boolean
}
