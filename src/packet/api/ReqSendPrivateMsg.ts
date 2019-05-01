/**
 * @module packet.api
 */

import { ParamAPIMessage } from '../ParamAPIMessage'

/**
 * @see {@link {CQHTTP_DOCS_URL}/#/API?id=send_private_msg-发送私聊消息 CQHTTP#发送私聊消息}
 */
export interface ReqSendPrivateMsg {
  user_id: number
  message: ParamAPIMessage
  auto_escape?: boolean
}
