import jsonp from './jsonp'
import {commonConfig,options,OK} from './config'
import axios from 'axios'


const debug = process.env.NODE_ENV !== 'production'

export function getRcommendSlide() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonConfig, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}


export function getDiscList() {
    const url = '/api/getDiscList'
    const data = Object.assign({}, commonConfig, {
      platform: 'yqq',
      hostUin: 0,
      sin: 0,
      ein: 29,
      sortId: 5,
      needNewCode: 0,
      categoryId: 10000000,
      rnd: Math.random(),
      format: 'json'
    })
    
    return axios.get(url, {
      params: data
    }).then((res) => {
        // return Promise function,it has message res.data
      return Promise.resolve(res.data)
    })
  }

  export function getSongList(disstid) {
    
    const url = debug ? '/api/getCdInfo' : 'http://120.79.214.80/music/api/getCdInfo'
  
    const data = Object.assign({}, commonConfig, {
      disstid,
      type: 1,
      json: 1,
      utf8: 1,
      onlysong: 0,
      platform: 'yqq',
      hostUin: 0,
      needNewCode: 0
    })
  
    return axios.get(url, {
      params: data
    }).then((res) => {
      return Promise.resolve(res.data)
    })
  }