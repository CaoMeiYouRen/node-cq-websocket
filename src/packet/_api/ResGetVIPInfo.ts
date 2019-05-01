/**
 * @module packet._api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据38 CQHTTP#获取会员信息-响应数据}
 */
export interface ResGetVIPInfo {
  user_id: number
  nickname: string
  level: number
  level_speed: number
  vip_level: number
  vip_growth_speed: number
  vip_growth_total: string
}
