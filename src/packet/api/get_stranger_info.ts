/**
 * @module packet.api
 */

import { ParamUserInfo } from '../ParamUserInfo'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=get_stranger_info-获取陌生人信息 CQHTTP#获取陌生人信息}
 */
export interface ReqGetStrangerInfo {
  action: 'get_stranger_info'
  params: {
    user_id: number
    no_cache?: boolean
  }
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据19 CQHTTP#获取陌生人信息-响应数据}
 */
export interface ResGetStrangerInfo {
  status: 'ok' | 'failed'
  retcode: number
  data: ParamUserInfo
}
