/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=get_stranger_info-获取陌生人信息 CQHTTP#获取陌生人信息}
 */
export interface ReqGetStrangerInfo {
  user_id: number
  no_cache?: boolean
}
