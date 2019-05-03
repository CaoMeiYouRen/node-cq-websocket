/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=can_send_image-检查是否可以发送图片 CQHTTP#检查是否可以发送图片}
 */
export interface ReqCanSendImage {
  action: 'can_send_image'
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据28 CQHTTP#检查是否可以发送图片-响应数据}
 */
export interface ResCanSendImage {
  status: 'ok' | 'failed'
  retcode: number
  data: {
    yes: boolean
  }
}
