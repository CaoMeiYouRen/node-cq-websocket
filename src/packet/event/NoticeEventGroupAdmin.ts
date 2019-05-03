/**
 * @module packet.event
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/Post?id=群管理员变动 CQHTTP#群管理员变动}
 */
export interface NoticeEventGroupAdmin {
  post_type: 'notice'
  notice_type: 'group_admin'
  sub_type: 'set' | 'unset'
  group_id: number
  user_id: number
}
