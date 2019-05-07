/**
 * @module packet._api
 */

import { ResponseBase } from '../ResponseBase'
import { ParamFriendInfoFlatten } from '../ParamFriendInfo'
import { ParamFriendGroupInfo, ParamFriendGroupInfoFlatten } from '../ParamFriendGroupInfo'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=_get_friend_list-获取好友列表 CQHTTP#获取好友列表}
 */
export interface ReqGetFriendList {
  action: '_get_friend_list'
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=_get_friend_list-获取好友列表 CQHTTP#获取好友列表}
 */
export interface ReqGetFriendListFlatten {
  action: '_get_friend_list'
  params: {
    flat: true
  }
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据36 CQHTTP#获取好友列表-响应数据}
 */
export interface ResGetFriendList extends ResponseBase {
  data: Array<ParamFriendGroupInfo>
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据36 CQHTTP#获取好友列表-响应数据}
 */
export interface ResGetFriendListFlatten extends ResponseBase {
  data: {
    friend_groups: Array<ParamFriendGroupInfoFlatten>
    friends: Array<ParamFriendInfoFlatten>
  }
}
