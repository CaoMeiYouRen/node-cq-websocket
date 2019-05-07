/**
 * @module packet.api
 */

import { ResponseBase } from '../ResponseBase'
import { ParamAPIMessage } from '../ParamAPIMessage'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=send_discuss_msg-发送讨论组消息 CQHTTP#发送讨论组消息}
 */
export interface ReqSendDiscussMsg {
  action: 'send_discuss_msg'
  params: {
    discuss_id: number
    message: ParamAPIMessage
    auto_escape?: boolean
  }
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据2 CQHTTP#发送讨论组消息-响应数据}
 */
export interface ResSendDiscussMsg extends ResponseBase {
  data: {
    message_id: number
  }
}
