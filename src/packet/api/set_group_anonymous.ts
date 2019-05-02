/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=set_group_anonymous-群组匿名 CQHTTP#群组匿名}
 */
export interface ReqSetGroupAnonymous {
  action: 'set_group_anonymous'
  params: {
    group_id: number
    enable?: boolean
  }
}
