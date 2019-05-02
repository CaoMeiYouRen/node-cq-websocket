/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据31 CQHTTP#获取 酷Q 及 HTTP API 插件的版本信息-响应数据}
 */
export interface ResGetVersionInfo {
  coolq_directory: string
  coolq_edition: string
  plugin_version: string
  plugin_build_number: number
  plugin_build_configuration: string
}
