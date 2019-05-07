/**
 * @module packet._api
 */

import { ResponseBase } from '../ResponseBase'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=_get_group_info-获取群信息 CQHTTP#获取群信息}
 */
export interface ReqGetGroupInfo {
  action: '_get_group_info'
  params: {
    group_id: number
  }
}

/**
 * @see {@link https?://cqhttp.cc/docs/4.10/#/API?id=响应数据37 CQHTTP#获取群信息-响应数据}
 */
export interface ResGetGroupInfo extends ResponseBase {
  data: {
    group_id?: number
    group_name?: string
    create_time?: number
    category?: number
    member_count?: number
    max_member_count?: number
    introduction?: string
    admins?: Array<ParamAdminInfo>
    admin_count?: number
    max_admin_count?: number
    owner_id?: number
  }
}
