/**
 * @module packet.api
 */

import { ParamAPIGroupMemberInfo } from '../ParamAPIGroupMemberInfo'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=get_group_member_info-获取群成员信息 CQHTTP#获取群成员信息}
 */
export interface ReqGetGroupMemberInfo {
  action: 'get_group_member_info'
  params: {
    group_id: number
    user_id: number
    no_cache?: boolean
  }
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据21 CQHTTP#获取群成员信息-响应数据}
 */
export interface ResGetGroupMemberInfo {
  status: 'ok' | 'failed'
  retcode: number
  data: ParamAPIGroupMemberInfo
}
