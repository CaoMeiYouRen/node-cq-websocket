import { ParamUserInfo } from './ParamUserInfo'

/**
 * @module packet
 */

export interface ParamGroupMemberInfo extends ParamUserInfo {
  group_id: number
  card: string
  area: string
  join_time: number
  last_sent_time: number
  level: string
  role: 'owner' | 'admin' | 'member'
  unfriendly: boolean
  title: string
  title_expire_time: number
  card_changeable: boolean
}
