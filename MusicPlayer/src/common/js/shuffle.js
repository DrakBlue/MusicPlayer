export const Radom = function (min,max) {
    return Math.random()*(max-min+1)+min | 0
}

export  const shuffle = function(arr){
    let _arr = []
    _arr = arr.slice()
    for(let i = 0;i<_arr.length;i++){
        let j = Radom(0,i)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr [j] = t
    }
    return _arr
}


export let playModeName={
    listPlay:0,
    radomPlay:1,
    singerPlay: 2
}
// export const playMode = {
//     sequence:0,
//     loop:1,
//     random:2
//   }