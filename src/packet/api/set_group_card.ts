/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=set_group_card-设置群名片（群备注） CQHTTP#设置群名片（群备注）}
 */
export interface ReqSetGroupCard {
  action: 'set_group_card'
  params: {
    group_id: number
    user_id: number
    card?: string
  }
}
