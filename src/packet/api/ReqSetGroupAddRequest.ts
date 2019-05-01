/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=set_group_add_request-处理加群请求／邀请 CQHTTP#处理加群请求／邀请}
 */
export interface ReqSetGroupAddRequest {
  flag: string
  sub_type?: 'add' | 'invite'
  type?: 'add' | 'invite'
  approve?: boolean
  reason?: string
}
