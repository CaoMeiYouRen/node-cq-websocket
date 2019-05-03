/**
 * @module packet.event
 */

import { ParamGroupFileInfo } from '../ParamGroupFileInfo'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/Post?id=群文件上传 CQHTTP#群文件上传}
 */
export interface NoticeEventGroupUpload {
  post_type: 'notice'
  notice_type: 'group_upload'
  group_id: number
  user_id: number
  file: ParamGroupFileInfo
}
