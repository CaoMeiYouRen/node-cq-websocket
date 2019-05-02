/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=get_csrf_token-获取-csrf-token CQHTTP#获取 CSRF Token}
 */
export interface ReqGetCSRFToken {
  action: 'get_csrf_token'
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据24 CQHTTP#获取 CSRF Token-响应数据}
 */
export interface ResGetCSRFToken {
  token: number
}
