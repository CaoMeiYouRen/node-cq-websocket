/**
 * @module packet.api
 */

import { ParamAPIMessage } from '../ParamAPIMessage'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=send_group_msg-发送群消息 CQHTTP#发送群消息}
 */
export interface ReqSendGroupMsg {
  action: 'send_group_msg'
  params: {
    group_id: number
    message: ParamAPIMessage
    auto_escape?: boolean
  }
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据1 CQHTTP#发送群消息-响应数据}
 */
export interface ResSendGroupMsg {
  status: 'ok' | 'failed'
  retcode: number
  data: {
    message_id: number
  }
}
