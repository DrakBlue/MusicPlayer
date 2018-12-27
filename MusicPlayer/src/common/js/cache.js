import storage from 'good-storage'
import { SET_SEARCH_HISTORY } from '../../store/mutation-types';

const SEARCH_KEY = '__search__'
const SEARCH_KEY_LENGTH = 15


const PLAY_HISTORY = '__playHistory__'
const PLAY_HISTORY_LENGTH = 80


const COLLECT_SINGER = '__collectSinger__'
const COLLECT_SINGER_LENGTH = 20

const COLLECT_SONG = '__collectSong__'
const COLLECT_SONG_LENGTH = 100


const insertItem = function(arr,key,compare,maxl){
    const index = arr.findIndex(compare)
    if(index==0){
        return
    }
    if(index>-1){
        arr.splice(index,1)
    }
    arr.unshift(key)

    if(maxl&&arr.length>maxl){
        arr.pop()
    }

}





const Save = function(loadStoreName,target){
    let Store = storage.get(loadStoreName,[])

    if(loadStoreName==PLAY_HISTORY){
        insertItem(Store,target,(item)=>{
            return item.id == target.id
        },PLAY_HISTORY_LENGTH)
    }else if(loadStoreName==SEARCH_KEY){
        insertItem(Store,target,(item)=>{
            return item == target
        },SEARCH_KEY_LENGTH)
    }

    storage.set(loadStoreName,Store)

    return Store

}

const removeSearchItem = function (arr,compare){
    arr.splice(arr.findIndex(compare),1)
}

const Remove = function (loadStoreName,target){
    let Store = storage.get(loadStoreName,[])

    if (loadStoreName==PLAY_HISTORY){
        removeSearchItem(Store,(item)=>{
            return item.id==target.id
        })
    }else if(loadStoreName==SEARCH_KEY){
        removeSearchItem(Store,(item)=>{
            return item==target
        })
    }

    storage.set(loadStoreName,Store)

    return Store
}


const Clear = function (loadStoreName){

    let Store = storage.get(loadStoreName,[])
    Store.splice(0)
    storage.set(loadStoreName,Store)
    return Store
}


export const lodeSearch = function(){
    return storage.get(SEARCH_KEY,[])
}

export const  saveSearch = function(target){
    return   Save(SEARCH_KEY,target)
}



export const removeASearch  = function (target){
    return Remove(SEARCH_KEY,target)
}

export const clearSearch  = function (){
    return Clear(SEARCH_KEY)
}






export const loadPlayHistory = function (){
    let loadPH = storage.get(PLAY_HISTORY,[])
    return loadPH
}


export const  savePlayHistory = function(target){
    return Save(PLAY_HISTORY,target)
}

export const removePlayHistoryOne  = function (target){
    return Remove(PLAY_HISTORY,target)
}

export const clearPlayHistory  = function (){
    return Clear(PLAY_HISTORY)
}


export const loadCollectSong = function (){
    let Load = storage.get(COLLECT_SONG,[])
    return Load
}

export const saveCollectSong = function (target){
    let Store = storage.get(COLLECT_SONG,[])
    let i = Store.findIndex((item)=>{
        return item.id == target.id
    })
    if(i<=-1){
        Store.unshift(target)
        if(Store.length>COLLECT_SONG_LENGTH){
            Store.pop()
        }
    }else{
        Store.splice(i,1)
    }
    storage.set(COLLECT_SONG,Store)
    return Store
}










