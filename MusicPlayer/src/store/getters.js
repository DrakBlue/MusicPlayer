export const routeName= state => state.routeName

export const singer = state => state.singer
export const Play_Radom = state => state.Play_Radom


export const screen_size = state => state.screen_size
export const play_list = state => state.play_list
export const current_index = state => state.current_index
export const paly_mode = state => state.paly_mode
export const stop_play = state => state.stop_play
export const current_song = function(state){
    return state.play_list[state.current_index] || {}
}

