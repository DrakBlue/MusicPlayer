import * as types from './mutation-types.js'

 const mutations = {
    [types.SET_ROUTE_NAME](state,routeName){
        state.routeName = routeName
    },
    [types.SET_SINGER](state,singer){
        state.singer = singer
    },
    [types.SET_PLAYRADOM](state,Play_Radom){
        state.Play_Radom = Play_Radom
    },
    [types.SET_SCREEN_SIZE](state,screen_size){
        state.screen_size = screen_size
    },
    [types.SET_PLAY_LIST](state,play_list){
        state.play_list = play_list
    },
    [types.SET_SEQUENCE_LIST](state,sequence_list){
        state.sequence_list = sequence_list
    },
    [types.SET_CURRENT_INDEX](state,current_index){
        state.current_index = current_index
    },
    [types.SET_PLAY_MODE](state,play_mode){
        state.play_mode = play_mode
    },
    [types.SET_STOP_PLAY](state,stop_play){
        state.stop_play = stop_play
    },
    [types.SET_MINPLAYER_STATE](state,minPlayState){
        state.minPlayState = minPlayState
    },
    [types.SET_DISC](state,disc){
        state.disc = disc
    },
    [types.SET_TOPLIST](state,topList){
        state.topList = topList
    },
    [types.SET_SEARCH_HISTORY](state,search_history){
        state.search_history = search_history
    },
    [types.SET_PLAY_HISTORY](state,playHistory){
        state.playHistory = playHistory
    },
    [types.SET_COLLECTSONG](state,collectSong){
        state.collectSong = collectSong
    }
}

export default mutations