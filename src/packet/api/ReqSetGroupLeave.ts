/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=set_group_leave-退出群组 CQHTTP#退出群组}
 */
export interface ReqSetGroupLeave {
  group_id: number
  is_dismiss?: boolean
}
