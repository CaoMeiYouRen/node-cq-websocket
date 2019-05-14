/**
 * @module packet
 */
/**
 */

export interface ResponseBase {
  status: 'ok' | 'failed'
  retcode: number
  data: any
  echo: string
}
