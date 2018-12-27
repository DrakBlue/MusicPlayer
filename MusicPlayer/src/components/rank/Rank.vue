<template>
<div>
    <better-scroll ref='refresh' :data='topList' class="rank">
        <div>
            <div class="rank-box" v-for="item in topList" :key="item.id" @click="selectTopList(item)">
                    <div class="title-and-image" >
                        <div class="layer"><img class="image" v-lazy="item.picUrl" alt=""></div>
                    </div>
                    <div class="rank-list">
                        <p class="list-name" v-for="(list,index) in item.songList" :key="index">
                            <span>{{index+1}}</span>
                            <span v-html="list.singername"></span>
                            <span>-</span>
                            <span v-html="list.songname"></span>
                        </p>
                    </div>
            </div>

        </div>
        <div class="load" v-show="topList.length == 0">
            <load-component></load-component>
        </div>
    </better-scroll>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
</div>
 </template>

<script>
import { OK } from "@/api/config";
import { getTopList } from "api/rank.js";
import {mapMutations,mapGetters} from 'vuex'
import BetterScroll from "../common/scroll";
import LoadComponent from "../common/load";
import {playlistMixin} from '@/common/js/mixin.js'


export default {
        mixins: [playlistMixin],
        data(){
            return {
                topList:[]
            }
        },
        name:'Rank',
        components:{
            BetterScroll,
            LoadComponent
        },
        methods:{
            selectTopList(item){
                this.$router.push({
                    path:`/rank/${item.id}`
                })
                this.setTopList(item)
            },
            handlePlaylist (playlist){
                const Bottom = playlist.length > 0 ? '70px' : ''
                this.$refs.refresh.$el.style.bottom = Bottom
                this.$refs.refresh.refresh()
            },
            ...mapMutations({
                setTopList:'SET_TOPLIST'
            }),
            _getTopList(){
                getTopList().then(res=>{
                    if(res.code == OK){
                        this.topList = res.data.topList
                    }
                })
            }        
        },
        created(){
            this._getTopList()
        },
        activated (){
        }
}
</script>


<style lang="stylus" scoped >
@import '~stylus/variable.styl';
.rank
    position absolute
    top 8rem
    left 0
    bottom  0
    right 0
    overflow hidden
    .rank-box
        width 90%
        margin 2rem auto
        display flex
        background-color $color-background-highlight
        .title-and-image
            position relative
            flex-basis 10rem
            height 10rem
            .layer
                position absolute
                left 0
                right 0
                top 0
                bottom 0
                background-color rgba(0,0,0,0.2)
                .image
                    width 100%
        .rank-list
            flex 1
            display flex
            flex-direction column
            justify-content center
            min-width 0
            .list-name       
                line-height 2.5rem
                font-size 1.2rem
                margin-left 2rem 
                color $color-text-l 
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
 .load
     position fixed
     width 10rem
     height 10rem
     top 50%
     margin-top -(@height/2) 
     left 50%
     margin-left -(@width/2) 

        
                
</style>
