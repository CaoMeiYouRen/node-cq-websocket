/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=响应数据30 CQHTTP#获取插件运行状态-响应数据}
 */
export interface ResGetStatus {
  app_initialized: boolean
  app_enabled: boolean
  plugins_good: Record<string, boolean>
  app_good: boolean
  online: boolean
  good: boolean
}
