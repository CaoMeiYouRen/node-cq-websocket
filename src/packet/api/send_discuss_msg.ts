/**
 * @module packet.api
 */

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
export interface ResSendDiscussMsg {
  status: 'ok' | 'failed'
  retcode: number
  data: {
    message_id: number
  }
}
