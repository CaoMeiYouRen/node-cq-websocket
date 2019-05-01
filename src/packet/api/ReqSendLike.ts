/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=send_like-发送好友赞 CQHTTP#发送好友赞}
 */
export interface ReqSendLike {
  user_id: number
  times?: number
}
