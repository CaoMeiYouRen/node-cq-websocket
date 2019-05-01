/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=get_record-获取语音 CQHTTP#获取语音}
 */
export interface ReqGetRecord {
  file: string
  out_format: 'mp3' | 'amr' | 'wma' | 'm4a' | 'spx' | 'ogg' | 'wav' | 'flac'
  full_path: boolean
}
