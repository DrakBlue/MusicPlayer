import jsonp from './jsonp'
import {commonConfig,options,OK} from './config'
import axios from 'axios'



 
export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonConfig, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk:1664029744

  })

  return jsonp(url, data, options)
}


export function getsingerDetail(singerId) {
  const url = 'http://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonConfig, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singerId
  })

  return jsonp(url, data, options)
}
export function getTopList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  
    const data = Object.assign({}, commonConfig, {
      uin: 0,
      needNewCode: 1,
      platform: 'h5'
    })
  
    return jsonp(url, data, options)
  }

  export function getMusicList(topid) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  
    const data = Object.assign({}, commonConfig, {
      topid,
      needNewCode: 1,
      uin: 0,
      tpl: 3,
      page: 'detail',
      type: 'top',
      platform: 'h5'
    })
  
    return jsonp(url, data, options)
  }