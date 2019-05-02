/**
 * @module packet.api
 */

import { ParamGroupMemberInfo } from '../ParamGroupMemberInfo'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=get_group_member_list-获取群成员列表 CQHTTP#获取群成员列表}
 */
export interface ReqGetGroupMemberList {
  action: 'get_group_member_list'
  params: {
    group_id: number
  }
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据22 CQHTTP#获取群成员列表-响应数据}
 */
export interface ResGetGroupMemberList extends Array<ParamGroupMemberInfo> {
}
