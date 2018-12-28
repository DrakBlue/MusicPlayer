

import {lodeSearch,loadPlayHistory,loadCollectSong} from '@/common/js/cache.js'

const playModeName={listPlay:0,radomPlay:1,singerPlay:2}

const state = {
    disc:{},
    topList:'',
    singer:{},
    minPlayState:true,
    Play_Radom:false,
    screen_size:true,
    play_list:[],
    sequence_list:[],
    current_index:-1,
    play_mode:playModeName.listPlay,
    stop_play:null,
    search_history:lodeSearch(),
    playHistory:loadPlayHistory(),
    collectSong:loadCollectSong(),
}

export default state