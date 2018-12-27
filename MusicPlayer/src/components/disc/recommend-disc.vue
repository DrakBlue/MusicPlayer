<template>
    <slide>
        <music-list :SongList='SongList'  :image='image' :title='title'></music-list>
    </slide>
</template>

<script>
//js
import { OK } from "@/api/config";


import { getSongList } from "api/getRecommend.js";
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
            SongList:[]
        }
    },
    computed: {
        image(){
            return this.disc.imgurl
        },
        title (){
            return this.disc.dissname
        },
        ...mapGetters([
            'disc'
        ]),
    },
    watch:{
        disc (newVal,oldVal){
            if(newVal!==oldVal){
                this.setRadomShow(false)
                this.SongList = []
                this._getSongList()
            }
        }
    },
    methods:{
        ...mapMutations({
            setRadomShow:'SET_PLAYRADOM'
        }),
        _getSongList() {
            if (!this.disc.dissid) {
                this.$router.push('/recommend')
                return
            }
            getSongList(this.disc.dissid).then((res) => {
            if (res.code === OK) {
               processSongsUrl(this._normalizeSongs(res.cdlist[0].songlist)).then((songs) => {
                    this.SongList = songs
                    this.setRadomShow(true)
                })
            }
            })
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach((musicData) => {
            if (isValidMusic(musicData)) {
                ret.push(createCDSong(musicData))
            }
            })
                return ret
        },

    },
    created (){
        this._getSongList()
    },
    components: {
        MusicList,
        Slide
    },
    
}
</script>

<style lang="stylus" scoped>
@import '~stylus/variable';     
</style>
