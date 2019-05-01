/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据24 CQHTTP#获取 CSRF Token-响应数据}
 */
export interface ResGetCSRFToken {
  token: number
}
