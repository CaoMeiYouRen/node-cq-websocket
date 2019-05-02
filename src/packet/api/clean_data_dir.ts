/**
 * @module packet.api
 */

/**
 * @see {@link https://cqhttp.cc/docs/4.10/#/API?id=clean_data_dir-清理数据目录 CQHTTP#清理数据目录}
 */
export interface ReqCleanDataDir {
  action: 'clean_data_dir'
  params: {
    data_dir: 'image' | 'record' | 'show' | 'bface'
  }
}
