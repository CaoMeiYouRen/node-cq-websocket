/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=set_discuss_leave-退出讨论组 CQHTTP#退出讨论组}
 */
export interface ReqSetDiscussLeave {
  discuss_id: number
}
