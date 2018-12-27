<template>

    <slide>
        <music-list :SongList='SongList'  :image='image' :title='title'></music-list>
    </slide>

</template>

<script>


//js
import { getsingerDetail } from "@/api/getSinger.js";
import {CreateSong,_formatSongs} from '@/common/js/song.js'
import { OK } from "@/api/config";
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
            return this.singer.imag
        },
        title (){
            return this.singer.name
        },
        ...mapGetters([
            'singer'
        ]),
    },
    watch:{
        singer (newVal,oldVal){
            if(newVal!==oldVal){
                this.setRadomShow(false)
                this.SongList = []
                this._getsingerDetail ()
            }
         
        }
    },
    methods:{
        ...mapMutations({
            setRadomShow:'SET_PLAYRADOM'
        }),
        _getsingerDetail (){
           if(!this.singer.id){
               this.$router.push('/singer')
               return
           }
           getsingerDetail(this.singer.id).then((res)=>{
               if(res.code==OK){
                    Promise.resolve(_formatSongs(res.data.list)).then(res=>{
                            this.SongList = res
                            this.setRadomShow(true)
                    })
               }
           })
        },

    },
    created (){
        this._getsingerDetail()
    },
    components: {
        MusicList,
        Slide
    },
    
}
</script>

<style lang="stylus" scoped>
 
</style>
