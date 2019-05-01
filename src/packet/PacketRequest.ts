/**
 * @module packet
 */

import { ReqSendPrivateMsg } from './api/ReqSendPrivateMsg'
import { ReqSendGroupMsg } from './api/ReqSendGroupMsg'
import { ReqSendDiscussMsg } from './api/ReqSendDiscussMsg'
import { ReqSendMsg } from './api/ReqSendMsg'
import { ReqSetGroupAdmin } from './api/ReqSetGroupAdmin'
import { ReqSetGroupAddRequest } from './api/ReqSetGroupAddRequest'
import { ReqSetFriendAddRequest } from './api/ReqSetFriendAddRequest'
import { ReqCleanDataDir } from './api/ReqCleanDataDir'
import { ReqDeleteMsg } from './api/ReqDeleteMsg'
import { ReqGetGroupMemberList } from './api/ReqGetGroupMemberList'
import { ReqGetImage } from './api/ReqGetImage'
import { ReqGetRecord } from './api/ReqGetRecord'
import { ReqGetStrangerInfo } from './api/ReqGetStrangerInfo'
import { ReqSendLike } from './api/ReqSendLike'
import { ReqSetDiscussLeave } from './api/ReqSetDiscussLeave'
import { ReqSetGroupAnonymous } from './api/ReqSetGroupAnonymous'
import { ReqSetGroupAnonymousBan } from './api/ReqSetGroupAnonymousBan'
import { ReqSetGroupBan } from './api/ReqSetGroupBan'
import { ReqSetGroupCard } from './api/ReqSetGroupCard'
import { ReqSetGroupKick } from './api/ReqSetGroupKick'
import { ReqSetGroupLeave } from './api/ReqSetGroupLeave'
import { ReqSetGroupSpecialTitle } from './api/ReqSetGroupSpecialTitle'
import { ReqSetGroupWholeBan } from './api/ReqSetGroupWholeBan'
import { ReqSetRestartPlugin } from './api/ReqSetRestartPlugin'
import { ReqGetGroupMemberInfo } from './api/ReqGetGroupMemberInfo'
import { ReqGetFriendList } from './_api/ReqGetFriendList'
import { ReqGetGroupInfo } from './_api/ReqGetGroupInfo'
import { ReqGetGroupNotice } from './_api/ReqGetGroupNotice'
import { ReqGetVIPInfo } from './_api/ReqGetVIPInfo'
import { ReqSendGroupNotice } from './_api/ReqSendGroupNotice'
import { ReqSetRestart } from './_api/ReqSetRestart'

export type PacketRequest =
  ReqCleanDataDir |
  ReqDeleteMsg |
  ReqGetGroupMemberInfo |
  ReqGetGroupMemberList |
  ReqGetImage |
  ReqGetRecord |
  ReqGetStrangerInfo |
  ReqSendDiscussMsg |
  ReqSendGroupMsg |
  ReqSendLike |
  ReqSendMsg |
  ReqSendPrivateMsg |
  ReqSetDiscussLeave |
  ReqSetFriendAddRequest |
  ReqSetGroupAddRequest |
  ReqSetGroupAdmin |
  ReqSetGroupAnonymous |
  ReqSetGroupAnonymousBan |
  ReqSetGroupBan |
  ReqSetGroupCard |
  ReqSetGroupKick |
  ReqSetGroupLeave |
  ReqSetGroupSpecialTitle |
  ReqSetGroupWholeBan |
  ReqSetRestartPlugin |
  ReqGetFriendList |
  ReqGetGroupInfo |
  ReqGetGroupNotice |
  ReqGetVIPInfo |
  ReqSendGroupNotice |
  ReqSetRestart
