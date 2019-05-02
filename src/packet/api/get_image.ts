/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=get_image-获取图片 CQHTTP#获取图片}
 */
export interface ReqGetImage {
  action: 'get_image'
  params: {
    file: string
  }
}
