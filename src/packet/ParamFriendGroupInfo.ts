/**
 * @module packet
 */
/**
 */

import { ParamFriendInfo } from './ParamFriendInfo'

export interface ParamFriendGroupInfoFlatten {
  friend_group_id: number
  friend_group_name: string
}

export interface ParamFriendGroupInfo extends ParamFriendGroupInfoFlatten {
  friends: Array<ParamFriendInfo>
}
