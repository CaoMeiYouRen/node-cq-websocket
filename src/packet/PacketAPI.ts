import { ReqCleanDataDir } from './api/clean_data_dir'
import { ReqSendPrivateMsg, ResSendPrivateMsg } from './api/send_private_msg'
import { ReqSendGroupMsg, ResSendGroupMsg } from './api/send_group_msg'
import { ReqSendDiscussMsg, ResSendDiscussMsg } from './api/send_discuss_msg'
import { ReqSendMsg, ResSendMsg } from './api/send_msg'
import { ReqDeleteMsg } from './api/delete_msg'
import { ReqSendLike } from './api/send_like'
import { ReqSetGroupKick } from './api/set_group_kick'
import { ReqSetGroupBan } from './api/set_group_ban'
import { ReqSetGroupAnonymousBan } from './api/set_group_anonymous_ban'
import { ReqSetGroupWholeBan } from './api/set_group_whole_ban'
import { ReqSetGroupAdmin } from './api/set_group_admin'
import { ReqSetGroupAnonymous } from './api/set_group_anonymous'
import { ReqSetGroupCard } from './api/set_group_card'
import { ReqSetGroupLeave } from './api/set_group_leave'
import { ReqSetGroupSpecialTitle } from './api/set_group_special_title'
import { ReqSetDiscussLeave } from './api/set_discuss_leave'
import { ReqSetFriendAddRequest } from './api/set_friend_add_request'
import { ReqSetGroupAddRequest } from './api/set_group_add_request'
import { ReqGetLoginInfo, ResGetLoginInfo } from './api/get_login_info'
import { ReqGetStrangerInfo, ResGetStrangerInfo } from './api/get_stranger_info'
import { ReqGetGroupList, ResGetGroupList } from './api/get_group_list'
import { ReqGetGroupMemberInfo, ResGetGroupMemberInfo } from './api/get_group_member_info'
import { ReqGetGroupMemberList, ResGetGroupMemberList } from './api/get_group_member_list'
import { ReqGetCookies, ResGetCookies } from './api/get_cookies'
import { ReqGetCSRFToken, ResGetCSRFToken } from './api/get_csrf_token'

/**
 * @module packet
 */

export interface PacketAPIResponseMap {
  send_private_msg: ResSendPrivateMsg
  send_group_msg: ResSendGroupMsg
  send_discuss_msg: ResSendDiscussMsg
  send_msg: ResSendMsg
  delete_msg: null
  send_like: null
  set_group_kick: null
  set_group_ban: null
  set_group_anonymous_ban: null
  set_group_whole_ban: null
  set_group_admin: null
  set_group_anonymous: null
  set_group_card: null
  set_group_leave: null
  set_group_special_title: null
  set_discuss_leave: null
  set_friend_add_request: null
  set_group_add_request: null
  get_login_info: ResGetLoginInfo
  get_stranger_info: ResGetStrangerInfo
  get_group_list: ResGetGroupList
  get_group_member_info: ResGetGroupMemberInfo
  get_group_member_list: ResGetGroupMemberList
  get_cookies: ResGetCookies
  get_csrf_token: ResGetCSRFToken
  // get_credentials: {
  //   request: null
  //   response: ResGetCredentials
  // }

  // get_record: {
  //   request: ReqGetRecord
  //   response: ResGetRecord
  // }

  // get_image: {
  //   request: ReqGetImage
  //   response: ResGetImage
  // }

  // can_send_image: {
  //   request: null
  //   response: ResCanSendImage
  // }

  // can_send_record: {
  //   request: null
  //   response: ResCanSendRecord
  // }

  // get_status: {
  //   request: null
  //   response: ResGetStatus
  // }

  // get_version_info: {
  //   request: null
  //   response: ResGetVersionInfo
  // }

  // set_restart_plugin: {
  //   request: ReqSetRestartPlugin
  //   response: null
  // }

  clean_data_dir: null

  // clean_plugin_log: {
  //   request: null
  //   response: null
  // }

  // _get_friend_list: {
  //   request: ReqGetFriendList
  //   response: ResGetFriendList
  // }

  // _get_group_info: {
  //   request: ReqGetGroupInfo
  //   response: ResGetGroupInfo
  // }

  // _get_vip_info: {
  //   request: ReqGetVIPInfo
  //   response: ResGetVIPInfo
  // }

  // _get_group_notice: {
  //   request: ReqGetGroupNotice
  //   response: ResGetGroupNotice
  // }

  // _send_group_notice: {
  //   request: ReqSendGroupNotice
  //   response: null
  // }

  // _set_restart: {
  //   request: ReqSetRestart
  //   response: null
  // }
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/WebSocketAPI?id=api-接口 CQHTTP#API 接口}
 */
export type PacketAPIRequest =
  ReqCleanDataDir |
  ReqSendPrivateMsg |
  ReqSendGroupMsg |
  ReqSendDiscussMsg |
  ReqSendMsg |
  ReqDeleteMsg |
  ReqSendLike |
  ReqSetGroupKick |
  ReqSetGroupBan |
  ReqSetGroupAnonymousBan |
  ReqSetGroupWholeBan |
  ReqSetGroupAdmin |
  ReqSetGroupAnonymous |
  ReqSetGroupCard |
  ReqSetGroupLeave |
  ReqSetGroupSpecialTitle |
  ReqSetDiscussLeave |
  ReqSetFriendAddRequest |
  ReqSetGroupAddRequest |
  ReqGetLoginInfo |
  ReqGetStrangerInfo |
  ReqGetGroupList |
  ReqGetGroupMemberInfo |
  ReqGetGroupMemberList |
  ReqGetCookies |
  ReqGetCSRFToken

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/WebSocketAPI?id=api-接口 CQHTTP#API 接口}
 */
export interface PacketAPIResponse<Request extends PacketAPIRequest> {
  status: 'ok' | 'failed'
  retcode: number
  data: PacketAPIResponseMap[Request['action']]
}
