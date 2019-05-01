/**
 * @module packet
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/Message?id=消息段（广义-cq-码） CQHTTP#消息段}
 */
export interface CQHTTPMessage {
  type: string
  data: null | Record<string, string>
}
