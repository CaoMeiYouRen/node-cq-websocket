/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据25 CQHTTP#获取 QQ 相关接口凭证-响应数据}
 */
export interface ResGetCredentials {
  cookies: string
  csrf_token: number
}
