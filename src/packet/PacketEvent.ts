/**
 * @module packet
 */

import { MessageEventPrivateMsg } from './event/MessageEventPrivateMsg'
import { MessageEventDiscussMsg } from './event/MessageEventDiscussMsg'
import { MessageEventGroupMsg } from './event/MessageEventGroupMsg'
import { MetaEventHeartbeat } from './event/MetaEventHeartbeat'
import { NoticeEventFriendAdd } from './event/NoticeEventFriendAdd'
import { NoticeEventGroupAdmin } from './event/NoticeEventGroupAdmin'
import { NoticeEventGroupDecrease } from './event/NoticeEventGroupDecrease'
import { NoticeEventGroupIncrease } from './event/NoticeEventGroupIncrease'
import { NoticeEventGroupUpload } from './event/NoticeEventGroupUpload'
import { RequestEventFriend } from './event/RequestEventFriend'
import { RequestEventGroup } from './event/RequestEventGroup'

export type PacketEvent =
  MessageEventDiscussMsg |
  MessageEventGroupMsg |
  MessageEventPrivateMsg |
  MetaEventHeartbeat |
  NoticeEventFriendAdd |
  NoticeEventGroupAdmin |
  NoticeEventGroupDecrease |
  NoticeEventGroupIncrease |
  NoticeEventGroupUpload |
  RequestEventFriend |
  RequestEventGroup
