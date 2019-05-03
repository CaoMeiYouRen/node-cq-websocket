/**
 * @module packet.event
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/Post?id=好友添加 CQHTTP#好友添加}
 */
export interface NoticeEventFriendAdd {
  post_type: 'notice'
  notice_type: 'friend_add'
  user_id: number
}
