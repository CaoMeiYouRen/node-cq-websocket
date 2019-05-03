/**
 * @module packet.event
 */

import { ParamAnonymous } from '../ParamAnonymous'
import { ParamEventMessage } from '../ParamEventMessage'
import { ParamEventGroupMemberInfo } from '../ParamEventGroupMemberInfo'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/Post?id=群消息 CQHTTP#群消息}
 */
export interface MessageEventGroupMsg {
  post_type: 'message'
  message_type: 'group'
  sub_type: 'normal' | 'anonymous' | 'notice'
  message_id: number
  group_id: number
  user_id: number
  anonymous: ParamAnonymous
  message: ParamEventMessage
  raw_message: string
  font: number
  sender: ParamEventGroupMemberInfo
}
