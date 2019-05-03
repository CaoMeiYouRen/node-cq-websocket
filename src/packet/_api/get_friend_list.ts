import { ParamFriendInfoFlatten } from '../ParamFriendInfo'
import { ParamFriendGroupInfo, ParamFriendGroupInfoFlatten } from '../ParamFriendGroupInfo'

/**
 * @module packet._api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=_get_friend_list-获取好友列表 CQHTTP#获取好友列表}
 */
export interface ReqGetFriendList {
  action: '_get_friend_list'
  params?: {
    flat?: false
  }
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
export interface ResGetFriendList {
  status: 'ok' | 'failed'
  retcode: number
  data: Array<ParamFriendGroupInfo>
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据36 CQHTTP#获取好友列表-响应数据}
 */
export interface ResGetFriendListFlatten {
  status: 'ok' | 'failed'
  retcode: number
  data: {
    friend_groups: Array<ParamFriendGroupInfoFlatten>
    friends: Array<ParamFriendInfoFlatten>
  }
}
