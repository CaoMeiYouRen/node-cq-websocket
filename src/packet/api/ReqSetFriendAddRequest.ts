/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=set_friend_add_request-处理加好友请求 CQHTTP#处理加好友请求}
 */
export interface ReqSetFriendAddRequest {
  flag: string
  approve?: boolean
  remark?: string
}
