import * as types from './mutation-types'
import {Radom,shuffle,playModeName} from '@/common/js/shuffle.js'
import {
    saveSearch,
    removeASearch,
    clearSearch,
    savePlayHistory,
    removePlayHistoryOne,
    clearPlayHistory,
    saveCollectSong } from '@/common/js/cache.js'
import Song from '@/common/js/song'
const FindIndex = function(list,target){
    return list.findIndex(item=>{
        return item.id == target.id
    })
}



export const selectMusic = function({commit,state},{list,index,screenSize}){
    commit(types.SET_SEQUENCE_LIST,list)
    commit(types.SET_SCREEN_SIZE,screenSize)
    commit(types.SET_STOP_PLAY,state.stop_play||false)
    if(state.play_mode==playModeName.radomPlay){
        let shuffledList =  shuffle(list)
        let i = FindIndex(shuffledList,state.sequence_list[index])
        commit(types.SET_CURRENT_INDEX,i)
        commit(types.SET_PLAY_LIST,shuffledList)        
    }else{
        commit(types.SET_CURRENT_INDEX,index)
        commit(types.SET_PLAY_LIST,list)  
    }
}

export const RadomPlay =  function({commit,state},playMode){
    let playlist = state.play_list.slice()
    let seqlist = state.sequence_list.slice()
    let cursong = playlist[state.current_index]
    if(playMode == playModeName.radomPlay){
        playlist = shuffle(playlist)
        let i = FindIndex(playlist,cursong)
        commit(types.SET_CURRENT_INDEX,i)
        commit(types.SET_PLAY_LIST,playlist) 
        commit(types.SET_STOP_PLAY,state.stop_play)
    }else{
        let i = FindIndex(seqlist,cursong)
        commit(types.SET_CURRENT_INDEX,i)
        commit(types.SET_PLAY_LIST,seqlist) 
        commit(types.SET_STOP_PLAY,state.stop_play)

    }

}


export const insertSong = function({commit,state},{song,screenSize}){
    song = new Song(song)
  let curlist = state.play_list.slice()
  
  let curindex = state.current_index
    if(!curlist.length){
        curlist.unshift(song)

    }
  let i  =  FindIndex(curlist,song)
  if(i==curindex){
      return
  }
  curlist.splice(curindex+1,0,song)
  commit(types.SET_CURRENT_INDEX,curindex+1)


  if(i>-1){
      if(curindex<i){
            curlist.splice(i+1,1)
            commit(types.SET_PLAY_LIST,curlist)
            commit(types.SET_SEQUENCE_LIST,curlist)

      }else if(curindex>i){
            curlist.splice(i,1)
            commit(types.SET_PLAY_LIST,curlist)
            commit(types.SET_SEQUENCE_LIST,curlist)
            commit(types.SET_CURRENT_INDEX,curindex)
      }
  }
    commit(types.SET_SEQUENCE_LIST,curlist)
    commit(types.SET_PLAY_LIST,curlist)
    commit(types.SET_SCREEN_SIZE,screenSize)
    commit(types.SET_STOP_PLAY,false)

}

export const deletSong = function({commit,state},song){
    let curlist = state.play_list.slice()
    let seqlist = state.sequence_list.slice()
    let curindex = state.current_index
    let i = FindIndex(curlist,song)
    let j = FindIndex(seqlist,song)
    curlist.splice(i,1)
    seqlist.splice(j,1)

    if(i<curindex){
       curindex-- 
    }
    if(!curlist[curindex]){
        curindex=0
    }
    
    commit(types.SET_PLAY_LIST,curlist)
    commit(types.SET_SEQUENCE_LIST,seqlist)
    commit(types.SET_CURRENT_INDEX,curindex)

    if(!curlist.length){
        commit(types.SET_STOP_PLAY,true)
    }else{
        commit(types.SET_STOP_PLAY,false)
    }
}

export const clearPlayList = function({commit,state}){
    commit(types.SET_SEQUENCE_LIST,[])
    commit(types.SET_PLAY_LIST,[])
    commit(types.SET_CURRENT_INDEX,-1)
    commit(types.SET_STOP_PLAY,true)
    commit(types.SET_SCREEN_SIZE,true)

}

export const saveSearchHistory = function({commit,state},quesiton){
    commit(types.SET_SEARCH_HISTORY,saveSearch(quesiton))
}
export const removeSearchItem = function({commit,state},target){
    commit(types.SET_SEARCH_HISTORY,removeASearch(target))
}
export const ClearAllSearch = function({commit,state}){
    commit(types.SET_SEARCH_HISTORY,clearSearch())
}



export const SaveHistorySong= function({commit},song){
    commit(types.SET_PLAY_HISTORY,savePlayHistory(song))
}
export const RemovePlayHistoryOne = function({commit},song){
    commit(types.SET_PLAY_HISTORY,removePlayHistoryOne(song))    
}

export const ClearPlayHistory = function({commit}){
    commit(types.SET_PLAY_HISTORY,clearPlayHistory())    
}

export const SaveCollectSong = function ({commit},song){
    commit(types.SET_COLLECTSONG,saveCollectSong(song))
}
