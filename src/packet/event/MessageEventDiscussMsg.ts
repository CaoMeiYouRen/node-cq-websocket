/**
 * @module packet.event
 */

import { ParamEventMessage } from '../ParamEventMessage'
import { ParamUserInfo } from '../ParamUserInfo'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/Post?id=讨论组消息 CQHTTP#讨论组消息}
 */
export interface MessageEventDiscussMsg {
  post_type: 'message'
  message_type: 'discuss'
  message_id: number
  discuss_id: number
  user_id: number
  message: ParamEventMessage
  raw_message: string
  font: number
  sender: ParamUserInfo
}
