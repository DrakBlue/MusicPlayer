<template>
    <better-scroll :scrollFlag='true' ref='refresh'  :momentum='momentum' :data='songList' :upDataByScroll='upDataByScroll' @scrollToEnd='upData' class="search-requests">
            <div>
                <ul class="requests-box" >
                    <ul class="zhida" v-if="zhidaContainer.state&&zhidaShow" @click="selectsinger">
                        <li><i class="iconfont icon-huangguan"></i></li>
                        <li v-html="zhidaContainer.singername"></li>  
                    </ul>
                    <ul class="songs" @click='selectsong(item)' v-for="(item,index) in songList" :key="index">
                        <li><i class="iconfont icon-yinle"></i></li>
                        <li class="request"><span v-html="item.name"></span><span>-</span><span v-html="item.singer"></span></li>
                    </ul>
                    
                </ul>
                <div class="load" v-show="loadState" >
                        <load-component size='width:3rem;height:3rem;'></load-component>
                </div>
            </div>
    </better-scroll>
    
</template>

<script>
import BetterScroll from '../common/scroll.vue'
import {playlistMixin} from '@/common/js/mixin.js'
import LoadComponent from "../common/load";

export default {
    mixins: [playlistMixin],
    components:{
        BetterScroll,
        LoadComponent,
    },
    props:{
        zhidaShow:{
            type:Boolean,
            default:true
        },
        songList:{
            type:Array,
            default:[]
        },
        loadState:{
            type:Boolean,
            default:true
        },
        zhidaContainer:{
            type:Object,
            default:{}
        },
        upDataByScroll:{
            type:Boolean,
            default:false
        },
        momentum:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        scroll(){
            this.$refs.refresh.scrollTo(0,0,1000)
        },
        handlePlaylist (playlist){
            const Bottom = playlist.length > 0 ? '70px' : ''
            this.$refs.refresh.$el.style.bottom = Bottom
            this.$refs.refresh.refresh()
            
        },
        upData (){
            this.$emit('catchMoreData')
        },
        selectsinger (){
            this.$emit('selectSinger')
            this.$emit('SelectSearch')            
        },
        selectsong (item){
            this.$emit('SelectSong',item)
            this.$emit('SelectSearch')
        }

    }
}
</script>

<style lang='stylus' scoped>
@import '~stylus/variable';
.search-requests
    color $color-text-ll
    height 100%
    position absolute
    top 12rem
    bottom 0
    left 0
    z-index 70
    right 0
    overflow hidden
    box-sizing border-box
    padding 0 5%
    .requests-box
        display flex
        flex-direction column
        .songs,.zhida
            display flex
            flex-direction row
            line-height 4rem
            height 4rem
            font-size 1.5rem
            align-items center
            letter-spacing .1rem
            .iconfont
                margin-right 1rem 
            .request
                min-width 0
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
        .zhida
            font-size 1.7rem
    .load
        position fixed
        top 100%
        left 50%
        margin-left -1.5rem 

</style>
