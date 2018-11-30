import jsonp from 'js/jsonp'
import {commonConfig,options,OK} from 'js/config'
export function getRcommendSlide(){
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    let data={}
    data=Object.assign({},commonConfig,{
        platform: 'h5',
        needNewCode: 1,
        _: 1543507318807
    })

    return jsonp(url,data,options)
}