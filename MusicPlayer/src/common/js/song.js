
import {getSongVkey} from '@/api/getVKey.js'


// export function CreateSong (item){
//     let obj ={}
//     let musicData = item.musicData
//     obj.albumname = musicData.albumname
//     obj.albummid = musicData.albumid 
//     obj.imagUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
//     obj.albumid = musicData.albumid
//     obj.songname = musicData.songname
//     obj.songorig = musicData.songorig
//     obj.songmid = musicData.songmid
//     obj.strMediaMid = musicData.strMediaMid
//     obj.songid = musicData.songid
//     obj.vid = musicData.vid
//     obj.Fupload_time = item.Fupload_time
//     obj.songUrl = `http://ws.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=0&guid=${musicData.songid}`
//     return obj
// }

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


    //重组 res.data.list 数据,只拿需要的
export function  _formatSongs (list){
        let result = []
        list.forEach((item)=>{
          // console.log('item',item)
          // 解构赋值-拿到item 下的 musicData 列表数据
          let {musicData} = item
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


