import originJSONP from 'jsonp'
import { promises } from 'fs';

export default function jsonp(url,data,option){
    url += ( url.indexOf("?")>0 ? '&' : '?')+param(data)
    return new Promise( (res,rej)=>{
        originJSONP(url,option,function(err,data){
            if(!err){
                res(data)
            }else{
                rej(err)
            }
        })
    })
}

function param(data){
    let url = ''
    for( let key in data ){
        let value = data[key] !== undefined ? data[key] : ""
        url = `$(key)=$(value)`
    }
    return url?url:""
}