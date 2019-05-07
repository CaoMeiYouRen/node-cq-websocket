/**
 * @module packet.api
 */

import { ResponseBase } from '../ResponseBase'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=get_record-获取语音 CQHTTP#获取语音}
 */
export interface ReqGetRecord {
  action: 'get_record'
  params: {
    file: string
    out_format: 'mp3' | 'amr' | 'wma' | 'm4a' | 'spx' | 'ogg' | 'wav' | 'flac'
    full_path: boolean
  }
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据26 CQHTTP#获取语音-响应数据}
 */
export interface ResGetRecord extends ResponseBase {
  data: {
    file: string
  }
}
