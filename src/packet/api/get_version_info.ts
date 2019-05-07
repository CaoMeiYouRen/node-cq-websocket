/**
 * @module packet.api
 */

import { ResponseBase } from '../ResponseBase'

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=get_version_info-获取-酷q-及-http-api-插件的版本信息 CQHTTP#获取 酷Q 及 HTTP API 插件的版本信息}
 */
export interface ReqGetVersionInfo {
  action: 'get_version_info'
}

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据31 CQHTTP#获取 酷Q 及 HTTP API 插件的版本信息-响应数据}
 */
export interface ResGetVersionInfo extends ResponseBase {
  data: {
    coolq_directory: string
    coolq_edition: string
    plugin_version: string
    plugin_build_number: number
    plugin_build_configuration: string
  }
}
