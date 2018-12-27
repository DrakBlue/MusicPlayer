<template>

<better-scroll :initDelay='100'  class="Wrapper" :data="list"   ref="refresh"  :scrollFlag="scrollFlag" @onscroll="onscroll" :probeType="probeType" >
    <div>
        <div class="song-list" ref="songList" > 
            <ul   class="song-box" @click="selectItem(item,index)" v-for="(item,index) in list" :key="item.id">
                <li v-show="rank" class="rank" v-html="Ranking(index)"></li>
                <li class="song-name">{{item.name}}</li>
                <li class="singer-name">{{item.singer}}</li>
            </ul>
            
        </div>
    </div>
</better-scroll>

</template>

<script>

import {mapGetters, mapMutations} from 'vuex'
import { OK } from "@/api/config";
import {CreateSong,_formatSongs} from '@/common/js/song.js'
import { getsongList } from "@/api/getSinger.js";
import BetterScroll from './scroll.vue'
import {playlistMixin} from '@/common/js/mixin.js'

export default {
    mixins: [playlistMixin],

    props:{
        list:{
            type:Array,
            default:()=>{return []}
        },
        rank:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            scrollFlag:true,
            songList:[]
        }
    },
    components:{
        BetterScroll
    },
    watch:{
       
    },
    methods:{
        Ranking(index){
            if(index==0){
                return `<svg class="icon-svg" aria-hidden="true"><use xlink:href="#icon-guanjun"></use></svg>`
            }else if(index==1){
                return  `<svg class="icon-svg" aria-hidden="true"><use xlink:href="#icon-yajun"></use></svg>`
            }else if(index==2){
                return  `<svg class="icon-svg" aria-hidden="true"><use xlink:href="#icon-jijun"></use></svg>`
            }else{
                return index+1
            }
        },
        handlePlaylist (playlist){
            const Bottom = playlist.length > 0 ? '70px' : ''
            this.$refs.refresh.$el.style.bottom = Bottom
            this.$refs.refresh.refresh()
        },
        handlerefresh(){
            this.$refs.refresh.refresh()
        },
        selectItem (item,index){
            this.$emit('playMusic',item,index)
        },
        onscroll (pos,dirY,maxY){
            this.$emit("onscroll",pos,dirY,maxY)
        },
    },
    computed:{
        ...mapGetters([
            'disc',
            'singer',
        ]),         
    },
    created (){
        this.listShow = false
        this.probeType=3  
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
    bottom 0
    right 0
    .song-list
        background-color $color-background
        padding-top .5rem
        .song-box
            line-height 3rem
            margin 1rem 0 .5rem 2rem 
            .rank
                float left
                font-size 2rem
                margin-right 2rem
                width 2rem
                height 2.5rem
                text-align center
            .song-name
                font-size 1.4rem
                line-height 2rem
                margin  0 0 .2rem 0
            .singer-name
                line-height 1.5rem
                font-size 1.1rem
                color $color-text-l
                white-space nowrap
                overflow hidden
                text-overflow ellipsis      
        



            
</style>
