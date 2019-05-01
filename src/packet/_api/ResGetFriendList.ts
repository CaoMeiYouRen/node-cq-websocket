/**
 * @module packet._api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据36 CQHTTP#获取好友列表-响应数据}
 */
export interface ResGetFriendListStructured {
  friend_group_id: number
  friend_group_name: string
  friends: Array<{
    user_id: number
    remark: string
    nickname: string
  }>
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据36 CQHTTP#获取好友列表-响应数据}
 */
export interface ResGetFriendListFlatten {
  friend_groups: Array<{
    friend_group_id: number
    friend_group_name: string
  }>
  friends: Array<{
    user_id: number
    remark: string
    nickname: string
    friend_group_id: number
  }>
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据36 CQHTTP#获取好友列表-响应数据}
 */
export type ResGetFriendList = ResGetFriendListStructured | ResGetFriendListFlatten
