
import {getSongVkey} from '@/api/getVKey.js'
import {Base64} from 'js-base64'

import {getLyric,getSongsUrl} from '@/api/getLyric.js'
import { OK } from "api/config";


export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.filename = `C400${this.mid}.m4a`
    this.url = url
  }


  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve,reject)=>{
      getLyric(this.mid).then(res=>{
        if(res.retcode === OK){
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        }else{
          reject('no lyric')
        }
      })
    })
  }

}

export function createCDSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: musicData.url
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

export function isValidMusic(musicData) {
  return musicData.songid && musicData.albummid && (!musicData.pay || musicData.pay.payalbumprice === 0)
}




export function CreatSong(musicData,vkey){ 
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
      　url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?fromtag=38&guid=5931742855&vkey=${vkey}`
    })
    
}
// //搜索部分的歌曲实例化
//  function CreatsingleSong (item,vkey){
//   return new Song({
//     id: item.songid,
//     mid: item.songmid,
//     singer: filterSinger(item.singer),
//     name: item.songname,
//     album: item.albumname,
//     duration: item.interval,
//     image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`,
//   　url: `http://dl.stream.qqmusic.qq.com/C400${item.songmid}.m4a?fromtag=38&guid=5931742855&vkey=${vkey}`
//   })
// }

// export function  _formatSingleSong (item){
//   let result = {}
//   list.forEach((item)=>{
//     getSongVkey(musicData.songmid).then((res) => {
//       const vkey = res.data.items[0].vkey;
//       if (item.songid && item.albummid) {
//         result=CreatsingleSong(item, vkey)
//       }
//     })
//   })
//   return result
// }



function filterSinger(singer) {
    let ret = []
    if (!singer) {
      return ''
    }
    singer.forEach((s) => {
      ret.push(s.name)
    })
    return ret.join('/')
}

export function processSongsUrl(songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }
  return getSongsUrl(songs).then((res) => {
    if (res.code === OK) {
      let midUrlInfo = res.url_mid.data.midurlinfo
      midUrlInfo.forEach((info, index) => {
        let song = songs[index]
        song.url = `http://dl.stream.qqmusic.qq.com/${info.purl}`
      })
    }
    return songs
  })
}


    //重组 res.data.list 数据,只拿需要的
export function  _formatSongs (list){
    let result = []
    list.forEach((item)=>{
      // console.log('item',item)
      // 解构赋值-拿到item 下的 musicData 列表数据
      let {musicData} = item
      // console.log(musicData)
      //------------- 更新的加上vkey
      getSongVkey(musicData.songmid).then((res) => {
        const vkey = res.data.items[0].vkey;
        if (musicData.songid && musicData.albummid) {
          result.push(CreatSong(musicData, vkey))
        }
      })
    })
   return result
}


