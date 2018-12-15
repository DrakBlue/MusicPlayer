
let list_play = 0
let radom_play = 1
let loop_paly = 2

const state = {
    routeName:'',
    singer:{},
    Play_Radom:false,
    screen_size:true,
    play_list:'',
    current_index:null,
    paly_mode:{list_play,radom_play,loop_paly},
    stop_play:true,
}

export default state