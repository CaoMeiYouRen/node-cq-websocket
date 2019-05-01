/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=get_group_member_info-获取群成员信息 CQHTTP#获取群成员信息}
 */
export interface ReqGetGroupMemberInfo {
  group_id: number
  user_id: number
  no_cache?: boolean
}
