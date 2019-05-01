/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=set_group_ban-群组单人禁言 CQHTTP#群组单人禁言}
 */
export interface ReqSetGroupBan {
  group_id: number
  user_id: number
  duration?: number
}
