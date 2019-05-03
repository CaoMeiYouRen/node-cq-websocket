/**
 * @module packet.event
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/Post?id=加群请求／邀请 CQHTTP#加群请求／邀请}
 */
export interface RequestEventGroup {
  post_type: 'request'
  request_type: 'group'
  sub_type: 'add' | 'invite'
  group_id: number
  user_id: number
  comment: string
  flag: string
}
