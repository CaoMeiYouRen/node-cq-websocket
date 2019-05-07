/**
 * @module packet.api
 */

import { ResponseBase } from '../ResponseBase'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=get_image-获取图片 CQHTTP#获取图片}
 */
export interface ReqGetImage {
  action: 'get_image'
  params: {
    file: string
  }
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据27 CQHTTP#获取图片-响应数据}
 */
export interface ResGetImage extends ResponseBase {
  data: {
    file: string
  }
}
