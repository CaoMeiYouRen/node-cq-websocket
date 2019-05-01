/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据18 CQHTTP#获取登录号信息-响应数据}
 */
export interface ResGetLoginInfo {
  user_id: number
  nickname: string
}
