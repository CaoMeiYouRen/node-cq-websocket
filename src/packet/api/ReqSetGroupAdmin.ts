/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=set_group_admin-群组设置管理员 CQHTTP#群组设置管理员}
 */
export interface ReqSetGroupAdmin {
  group_id: number
  user_id: number
  enable?: boolean
}
