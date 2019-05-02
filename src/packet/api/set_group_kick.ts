/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=set_group_kick-群组踢人 CQHTTP#群组踢人}
 */
export interface ReqSetGroupKick {
  action: 'set_group_kick'
  params: {
    group_id: number
    user_id: number
    reject_add_request?: boolean
  }
}
