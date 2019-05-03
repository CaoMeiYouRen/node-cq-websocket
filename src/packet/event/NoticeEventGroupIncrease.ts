/**
 * @module packet.event
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/Post?id=群成员增加 CQHTTP#群成员增加}
 */
export interface NoticeEventGroupIncrease {
  post_type: 'notice'
  notice_type: 'group_increase'
  sub_type: 'approve' | 'invite'
  group_id: number
  operator_id: number
  user_id: number
}
