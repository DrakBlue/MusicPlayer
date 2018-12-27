export const routeName= state => state.routeName

export const singer = state => state.singer
export const Play_Radom = state => state.Play_Radom


export const screen_size = state => state.screen_size
export const play_list = state => state.play_list
export const sequence_list = state => state.sequence_list
export const current_index = state => state.current_index
export const play_mode = state => state.play_mode
export const stop_play = state => state.stop_play
export const current_song = function(state){
    return state.play_list[state.current_index] || {}
}
export const minPlayState = state =>state.minPlayState
export const disc = state =>state.disc
export const topList = state =>state.topList
export const search_history = state =>state.search_history
export const playHistory = state => state.playHistory
export const collectSong = state => state.collectSong
