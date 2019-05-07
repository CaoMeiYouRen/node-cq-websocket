/**
 * @module packet.api
 */

import { ResponseBase } from '../ResponseBase'
import { ParamAPIMessage } from '../ParamAPIMessage'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=send_private_msg-发送私聊消息 CQHTTP#发送私聊消息}
 */
export interface ReqSendPrivateMsg {
  action: 'send_private_msg'
  params: {
    user_id: number
    message: ParamAPIMessage
    auto_escape?: boolean
  }
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据 CQHTTP#发送私聊消息-响应数据}
 */
export interface ResSendPrivateMsg extends ResponseBase {
  data: {
    message_id: number
  }
}
