/**
 * @module packet
 */

/**
 * @see {@link {CQHTTP_DOCS_URL}/#/Message?id=%E6%B6%88%E6%81%AF%E6%AE%B5%EF%BC%88%E5%B9%BF%E4%B9%89-cq-%E7%A0%81%EF%BC%89 CQHTTP#消息段}
 */
export interface CQHTTPMessage {
  type: string
  data: null | Record<string, string>
}
