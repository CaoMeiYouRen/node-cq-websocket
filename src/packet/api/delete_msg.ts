/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=delete_msg-撤回消息 CQHTTP#撤回消息}
 */
export interface ReqDeleteMsg {
  action: 'delete_msg'
  params: {
    message_id: number
  }
}
