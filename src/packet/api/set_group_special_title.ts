/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=set_group_special_title-设置群组专属头衔 CQHTTP#设置群组专属头衔}
 */
export interface ReqSetGroupSpecialTitle {
  action: 'set_group_special_title'
  params: {
    user_id: number
    group_id: number
    special_title?: string
    duration?: number
  }
}
