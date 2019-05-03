/**
 * @module packet
 */
/**
 */

export interface ParamFriendInfo {
  user_id: number
  remark: string
  nickname: string
}

export interface ParamFriendInfoFlatten extends ParamFriendInfo {
  friend_group_id: number
}
