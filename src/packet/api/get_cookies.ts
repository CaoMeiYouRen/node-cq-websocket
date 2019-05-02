/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=get_cookies-获取-cookies CQHTTP#获取 Cookies}
 */
export interface ReqGetCookies {
  action: 'get_cookies'
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据23 CQHTTP#获取 Cookies-响应数据}
 */
export interface ResGetCookies {
  cookies: string
}
