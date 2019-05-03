/**
 * @module packet.api
 */

import { ParamAPIMessage } from '../ParamAPIMessage'

/**
 * For better typings, use [[ReqSendPrivateMsg]], [[ReqSendGroupMsg]] or [[ReqSendDiscussMsg]] instead.
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=send_msg-发送消息 CQHTTP#发送消息}
 */
export interface ReqSendMsg {
  action: 'send_msg'
  params: {
    message_type?: 'private' | 'group' | 'discuss'
    user_id?: number
    discuss_id?: number
    group_id?: number
    message: ParamAPIMessage
    auto_escape?: boolean
  }
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据3 CQHTTP#发送消息-响应数据}
 */
export interface ResSendMsg {
  status: 'ok' | 'failed'
  retcode: number
  data: {
    message_id: number
  }
}
