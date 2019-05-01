/**
 * @module packet._api
 */

/**
 * @see {@link https?://cqhttp.cc/docs/4.10/#/API?id=响应数据37 CQHTTP#获取群信息-响应数据}
 */
export interface ResGetGroupInfo {
  group_id?: number
  group_name?: string
  create_time?: number
  category?: number
  member_count?: number
  max_member_count?: number
  introduction?: string
  admins?: Array<{
    user_id: number
    nickname: string
    role: 'owner' | 'admin'
  }>
  admin_count?: number
  max_admin_count?: number
  owner_id?: number
}
