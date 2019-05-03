/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=get_login_info-获取登录号信息 CQHTTP#获取登录号信息}
 */
export interface ReqGetLoginInfo {
  action: 'get_login_info'
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据18 CQHTTP#获取登录号信息-响应数据}
 */
export interface ResGetLoginInfo {
  status: 'ok' | 'failed'
  retcode: number
  data: {
    user_id: number
    nickname: string
  }
}
