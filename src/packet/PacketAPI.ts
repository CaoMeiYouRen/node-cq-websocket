/**
 * @module packet
 */

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
import { ReqGetCredentials, ResGetCredentials } from './api/get_credentials'
import { ReqGetRecord, ResGetRecord } from './api/get_record'
import { ReqGetImage, ResGetImage } from './api/get_image'
import { ReqCanSendImage, ResCanSendImage } from './api/can_send_image'
import { ReqCanSendRecord, ResCanSendRecord } from './api/can_send_record'
import { ReqGetStatus, ResGetStatus } from './api/get_status'
import { ReqGetVersionInfo, ResGetVersionInfo } from './api/get_version_info'
import { ReqSetRestartPlugin } from './api/set_restart_plugin'
import { ReqCleanPluginLog } from './api/clean_plugin_log'
import {
  ReqGetFriendList,
  ReqGetFriendListFlatten,
  ResGetFriendList,
  ResGetFriendListFlatten
} from './_api/get_friend_list'
import { ReqGetGroupInfo, ResGetGroupInfo } from './_api/get_group_info'
import { ReqGetGroupNotice, ResGetGroupNotice } from './_api/get_group_notice'
import { ReqGetVIPInfo, ResGetVIPInfo } from './_api/get_vip_info'
import { ReqSendGroupNotice } from './_api/send_group_notice'
import { ReqSetRestart } from './_api/set_restart'

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
  ReqGetCSRFToken |
  ReqGetCredentials |
  ReqGetRecord |
  ReqGetImage |
  ReqCanSendImage |
  ReqCanSendRecord |
  ReqGetStatus |
  ReqGetVersionInfo |
  ReqSetRestartPlugin |
  ReqCleanPluginLog |
  ReqGetFriendList |
  ReqGetFriendListFlatten |
  ReqGetGroupInfo |
  ReqGetGroupNotice |
  ReqGetVIPInfo |
  ReqSendGroupNotice |
  ReqSetRestart

/**
 * No response data, only staus and code are returned.
 */
export interface PacketAPIResponseEmpty {
  status: 'ok' | 'failed'
  retcode: number
  data: null
}

/**
 * Response packets are looked up by the corresponding [[PacketAPIRequest]].
 * @see {@link https://cqhttp.cc/docs/4.10/#/WebSocketAPI?id=api-接口 CQHTTP#API 接口}
 */
export type PacketAPIResponse<R extends PacketAPIRequest> =
  R extends ReqSendPrivateMsg ? ResSendPrivateMsg :
  R extends ReqSendGroupMsg ? ResSendPrivateMsg :
  R extends ReqSendDiscussMsg ? ResSendDiscussMsg :
  R extends ReqSendMsg ? ResSendMsg :
  R extends ReqDeleteMsg ? PacketAPIResponseEmpty :
  R extends ReqSendLike ? PacketAPIResponseEmpty :
  R extends ReqSetGroupKick ? PacketAPIResponseEmpty :
  R extends ReqSetGroupBan ? PacketAPIResponseEmpty :
  R extends ReqSetGroupAnonymousBan ? PacketAPIResponseEmpty :
  R extends ReqSetGroupWholeBan ? PacketAPIResponseEmpty :
  R extends ReqSetGroupAdmin ? PacketAPIResponseEmpty :
  R extends ReqSetGroupAnonymous ? PacketAPIResponseEmpty :
  R extends ReqSetGroupCard ? PacketAPIResponseEmpty :
  R extends ReqSetGroupLeave ? PacketAPIResponseEmpty :
  R extends ReqSetGroupSpecialTitle ? PacketAPIResponseEmpty :
  R extends ReqSetDiscussLeave ? PacketAPIResponseEmpty :
  R extends ReqSetFriendAddRequest ? PacketAPIResponseEmpty :
  R extends ReqSetGroupAddRequest ? PacketAPIResponseEmpty :
  R extends ReqGetLoginInfo ? ResGetLoginInfo :
  R extends ReqGetStrangerInfo ? ResGetStrangerInfo :
  R extends ReqGetGroupList ? ResGetGroupList :
  R extends ReqGetGroupMemberInfo ? ResGetGroupMemberInfo :
  R extends ReqGetGroupMemberList ? ResGetGroupMemberList :
  R extends ReqGetCookies ? ResGetCookies :
  R extends ReqGetCSRFToken ? ResGetCSRFToken :
  R extends ReqGetCredentials ? ResGetCredentials :
  R extends ReqGetRecord ? ResGetRecord :
  R extends ReqGetImage ? ResGetImage :
  R extends ReqCanSendImage ? ResCanSendImage :
  R extends ReqCanSendRecord ? ResCanSendRecord :
  R extends ReqGetStatus ? ResGetStatus :
  R extends ReqGetVersionInfo ? ResGetVersionInfo :
  R extends ReqSetRestartPlugin ? PacketAPIResponseEmpty :
  R extends ReqCleanDataDir ? PacketAPIResponseEmpty :
  R extends ReqCleanPluginLog ? PacketAPIResponseEmpty :
  R extends ReqGetFriendList ? ResGetFriendList :
  R extends ReqGetFriendListFlatten ? ResGetFriendListFlatten :
  R extends ReqGetGroupInfo ? ResGetGroupInfo :
  R extends ReqGetGroupNotice ? ResGetGroupNotice :
  R extends ReqGetVIPInfo ? ResGetVIPInfo :
  R extends ReqSendGroupNotice ? PacketAPIResponseEmpty :
  R extends ReqSetRestart ? PacketAPIResponseEmpty :
  never
