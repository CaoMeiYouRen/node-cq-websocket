/**
 * @module Packet
 */

import { CQHTTPMessage } from './CQHTTPMessage'

/**
 * @see {@link https://cqhttp.cc/docs/#/Post?id=%E7%A7%81%E8%81%8A%E6%B6%88%E6%81%AF CQHTTP#私聊消息}
 */
export interface EventPacketPrivateMsg {
  post_type: 'message'
  message_type: 'private'
  sub_type: 'friend' | 'group' | 'discuss' | 'other'
  message_id: number
  user_id: number
  message: Array<CQHTTPMessage>
  raw_message: string
  font: number
  sender: MessageSender
}

export interface MessageSender {
  user_id?: number
  nickname?: string
  sex?: 'male' | 'female' | 'unknown'
  age?: number
}
