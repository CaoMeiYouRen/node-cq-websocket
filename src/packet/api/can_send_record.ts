/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=can_send_record-检查是否可以发送语音 CQHTTP#检查是否可以发送语音}
 */
export interface ReqCanSendRecord {
  action: 'can_send_record'
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据29 CQHTTP#检查是否可以发送语音-响应数据}
 */
export interface ResCanSendRecord {
  status: 'ok' | 'failed'
  retcode: number
  data: {
    yes: boolean
  }
}
