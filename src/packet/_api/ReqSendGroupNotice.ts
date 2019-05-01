/**
 * @module packet._api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=_send_group_notice-发布群公告 CQHTTP#发布群公告}
 */
export interface ReqSendGroupNotice {
  group_id: number
  title: string
  content: string
}
