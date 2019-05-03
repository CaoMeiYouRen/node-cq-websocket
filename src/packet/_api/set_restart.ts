/**
 * @module packet._api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=_set_restart-重启-酷q，并以当前登录号自动登录（需勾选快速登录） CQHTTP#重启酷q，并以当前登录号自动登录（需勾选快速登录）}
 */
export interface ReqSetRestart {
  action: '_set_restart'
  params: {
    clean_log: boolean
    clean_cache: boolean
    clean_event: boolean
  }
}
