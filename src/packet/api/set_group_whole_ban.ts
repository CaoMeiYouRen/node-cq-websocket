/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=set_group_whole_ban-群组全员禁言 CQHTTP#群组全员禁言}
 */
export interface ReqSetGroupWholeBan {
  action: 'set_group_whole_ban'
  params: {
    group_id: number
    enable?: boolean
  }
}
