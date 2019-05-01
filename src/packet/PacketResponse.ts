/**
 * @module packet
 */

import { ResSendMsg } from './api/ResSendMsg'
import { ResCanSendImage } from './api/ResCanSendImage'
import { ResCanSendRecord } from './api/ResCanSendRecord'
import { ResGetCookies } from './api/ResGetCookies'
import { ResGetCredentials } from './api/ResGetCredentials'
import { ResGetCSRFToken } from './api/ResGetCSRFToken'
import { ResGetGroupList } from './api/ResGetGroupList'
import { ResGetGroupMemberInfo } from './api/ResGetGroupMemberInfo'
import { ResGetGroupMemberList } from './api/ResGetGroupMemberList'
import { ResGetImage } from './api/ResGetImage'
import { ResGetLoginInfo } from './api/ResGetLoginInfo'
import { ResGetRecord } from './api/ResGetRecord'
import { ResGetStatus } from './api/ResGetStatus'
import { ResGetStrangerInfo } from './api/ResGetStrangerInfo'
import { ResGetVersionInfo } from './api/ResGetVersionInfo'
import { ResGetFriendList } from './_api/ResGetFriendList'
import { ResGetGroupInfo } from './_api/ResGetGroupInfo'
import { ResGetGroupNotice } from './_api/ResGetGroupNotice'
import { ResGetVIPInfo } from './_api/ResGetVIPInfo'

export type PacketResponse =
  ResCanSendImage |
  ResCanSendRecord |
  ResGetCookies |
  ResGetCredentials |
  ResGetCSRFToken |
  ResGetGroupList |
  ResGetGroupMemberInfo |
  ResGetGroupMemberList |
  ResGetImage |
  ResGetLoginInfo |
  ResGetRecord |
  ResGetStatus |
  ResGetStrangerInfo |
  ResGetVersionInfo |
  ResSendMsg |
  ResGetFriendList |
  ResGetGroupInfo |
  ResGetGroupNotice |
  ResGetVIPInfo
