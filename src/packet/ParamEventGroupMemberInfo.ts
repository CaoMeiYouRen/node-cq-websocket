/**
 * @module packet
 */

import { ParamUserInfo } from './ParamUserInfo'

export interface ParamEventGroupMemberInfo extends ParamUserInfo {
  card: string
  area: string
  level: string
  role: 'owner' | 'admin' | 'member'
  title: string
}
