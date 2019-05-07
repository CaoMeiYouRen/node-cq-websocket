/**
 * @module packet.api
 */

import { ResponseBase } from '../ResponseBase'
import { ParamGroupInfo } from '../ParamGroupInfo'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=get_group_list-获取群列表 CQHTTP#获取群列表}
 */
export interface ReqGetGroupList {
  action: 'get_group_list'
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据20 CQHTTP#获取群列表-响应数据}
 */
export interface ResGetGroupList extends ResponseBase {
  data: Array<ParamGroupInfo>
}
