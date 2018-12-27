<template>
    <slide>
        <music-list :rank="rank" :SongList='SongList'  :image='image' :title='title'></music-list>
    </slide>
</template>

<script>
//js
import { getMusicList } from "api/rank.js";
import { OK } from "@/api/config";
import {createCDSong, isValidMusic, processSongsUrl} from '@/common/js/song.js'

//components
import MusicList from '../music/music-list'
import Slide from '../slide-slot/slide-LtoR'

//vuex
import {mapActions,mapGetters,mapMutations} from 'vuex'



export default {
    data (){
        return {
            titleHeight:null,
            SongListTop:null,
            SongList:[],
            rank:true
        }
    },
    computed: {
        image(){
            return this.topList.picUrl
        },
        title (){
            return this.topList.dissname
        },
        ...mapGetters([
            'topList'
        ]),
    },
    watch:{
        topList (newVal,oldVal){
            if(newVal!==oldVal){
                this.setRadomShow(false)
                this.SongList = []
                this._getTopMusicList()
            }
        }
    },
    methods:{
        ...mapMutations({
            setRadomShow:'SET_PLAYRADOM'
        }),
        _getTopMusicList (){
                    if(!this.topList.id){
                            this.$router.push('/rank')
                            return
                    }
                    getMusicList(this.topList.id).then(res=>{
                        if(res.code == OK){
                            let songlist = res.songlist
                            processSongsUrl(this._normalizeSongs(songlist)).then((songs) => {
                                this.SongList = songs
                                console.log(this.SongList)
                            })
                        }
                    })
                },
        _normalizeSongs(list) {
            let ret = []
            list.forEach((item) => {
            const musicData = item.data
                if (isValidMusic(musicData)) {
                    ret.push(createCDSong(musicData))
                }
            })
            return ret
        },
    },
    created (){
        this._getTopMusicList()
    },
    components: {
        MusicList,
        Slide
    },
    
}
</script>

<style lang="stylus" scoped>

             
    
     
</style>
