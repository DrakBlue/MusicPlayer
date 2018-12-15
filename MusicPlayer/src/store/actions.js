import * as types from './mutation-types'

export const selectMusic = function({commit,state},{list,index,screenSize}){
    commit(types.SET_PLAY_LIST,list)
    commit(types.SET_SCREEN_SIZE,screenSize)
    commit(types.SET_STOP_PLAY,false)
    commit(types.SET_CURRENT_INDEX,index)
}