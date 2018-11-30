import jsonp from 'js/jsonp'
import {commonConfig,options} from 'js/config.js'
import axios from 'axios'


    
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
