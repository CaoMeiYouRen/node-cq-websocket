/**
 * @module packet._api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=_get_group_notice-获取群公告 CQHTTP#获取群公告}
 */
export interface ReqGetGroupNotice {
  action: '_get_group_notice'
  params: {
    group_id: number
  }
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据39 CQHTTP#获取群公告-响应数据}
 */
export interface ResGetGroupNotice {
  status: 'ok' | 'failed'
  retcode: number
  data: Array<Record<string, any>>
}
