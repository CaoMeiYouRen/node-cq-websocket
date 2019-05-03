/**
 * @module packet.event
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/Post?id=群成员减少 CQHTTP#群成员减少}
 */
export interface NoticeEventGroupDecrease {
  post_type: 'notice'
  notice_type: 'group_decrease'
  sub_type: 'leave' | 'kick' | 'kick_me'
  group_id: number
  operator_id: number
  user_id: number
}
