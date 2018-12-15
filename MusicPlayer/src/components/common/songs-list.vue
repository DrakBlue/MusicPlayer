<template>

<better-scroll class="Wrapper"  ref="refresh"  :scrollFlag="scrollFlag" @onscroll="onscroll" :probeType="probeType" >
    <div class="song-list" ref="songList"> 
        <ul class="song-box" @click="playMusic(item,index)" v-for="(item,index) in SingerDetail" :key="item.id" @load="refresh">
            <li class="song-name">{{item.name}}</li>
            <li class="singer-name">{{item.singer}}</li>
        </ul>
        <div class="load" v-show="!SingerDetail">
            <load-component></load-component>
        </div>
    </div>
</better-scroll>

</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import { getSingerDetail } from "api/getSinger.js";
import { OK } from "api/config";
import {CreateSong,_formatSongs} from '@/common/js/song.js'
import LoadComponent from "./load";
import BetterScroll from './scroll.vue'

export default {
    data(){
        return{
            SingerDetail:null,
            lastSinger:null,
            scrollFlag:true,
            
        }
    },
    components:{
        LoadComponent,
        BetterScroll
    },
    props:{
        
    },
    methods:{
        playMusic (item,index){
            this.$emit('playMusic',item,index,this.SingerDetail)
        },
        ...mapMutations({
            setPlayRadom:'SET_PLAYRADOM',
            
        }),
        onscroll (pos,dirY,maxY){
            this.$emit("onscroll",pos,dirY,maxY)
        },
        refresh (){
            if(this.refreshFlag){
                this.$refs.refresh.refresh()
                this.refresh=false
            }
        },
       _getSingerDetail (){
           if(!this.singer.id){
               this.$router.push('/singer')
               return
           }
           getSingerDetail(this.singer.id).then((res)=>{
               if(res.code==OK){
                 this.SingerDetail =  _formatSongs(res.data.list)
                 this.setPlayRadom(true)
                 this.$emit('PushSongs',this.SingerDetail)
               }
           })
       },
    },
    computed:{
        ...mapGetters([
            'singer','Play_Radom'
        ]),
    },
    mounted (){
      
    },
    updated(){
        
    },
    activated (){
        if(this.lastSinger!==this.singer){
            this.setPlayRadom(false)
            this.SingerDetail=null
            this._getSingerDetail()
            this.lastSinger =this.singer
        }
    },
    created (){
        this._getSingerDetail()   
        this.refresh()
        this.probeType=3  
        this.refreshFlag=true
    }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/variable';
.Wrapper
    position absolute
    transform-origin top
    left 0
    top 0
    bottom 6rem
    right 0
    .song-list
        background-color $color-background 
        .song-box
            padding 1.5rem 0 1.5rem 2rem
            .song-name
                padding 0 0 1rem 0
            .singer-name
                font-size 1.2rem
                color $color-text-l
                white-space nowrap
                overflow hidden
                text-overflow ellipsis      
        .load
            margin-top 50%
</style>
