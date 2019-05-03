/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=get_credentials-获取-qq-相关接口凭证 CQHTTP#获取 QQ 相关接口凭证}
 */
export interface ReqGetCredentials {
  action: 'get_credentials'
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据25 CQHTTP#获取 QQ 相关接口凭证-响应数据}
 */
export interface ResGetCredentials {
  status: 'ok' | 'failed'
  retcode: number
  data: {
    cookies: string
    csrf_token: number
  }
}
