/**
 * @module packet.api
 */

import { ParamAnonymous } from '../ParamAnonymous'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=set_group_anonymous_ban-群组匿名用户禁言 CQHTTP#群组匿名用户禁言}
 */
export interface ReqSetGroupAnonymousBan {
  group_id: number
  anonymous?: ParamAnonymous
  anonymous_flag?: ParamAnonymous['flag']
  flag?: ParamAnonymous['flag']
  duration?: number
}
