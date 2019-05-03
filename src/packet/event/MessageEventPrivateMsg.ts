/**
 * @module packet.event
 */

import { ParamUserInfo } from '../ParamUserInfo'
import { ParamEventMessage } from '../ParamEventMessage'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/Post?id=私聊消息 CQHTTP#私聊消息}
 */
export interface MessageEventPrivateMsg {
  post_type: 'message'
  message_type: 'private'
  sub_type: 'friend' | 'group' | 'discuss' | 'other'
  message_id: number
  user_id: number
  message: ParamEventMessage
  raw_message: string
  font: number
  sender: ParamUserInfo
}
