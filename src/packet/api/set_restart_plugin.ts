/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=set_restart_plugin-重启-http-api-插件 CQHTTP#重启-http-api-插件}
 */
export interface ReqSetRestartPlugin {
  action: 'set_restart_plugin'
  params: {
    delay?: number
  }
}
