/**
 * @module packet.event
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/Post?id=加好友请求 CQHTTP#加好友请求}
 */
export interface RequestEventFriend {
  post_type: 'request'
  request_type: 'friend'
  user_id: number
  comment: string
  flag: string
}
