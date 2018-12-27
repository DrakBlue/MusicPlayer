<template>
<transition  enter-active-class="Enter" leave-active-class="Leave">
    <div class="person-area" ref='personArea'>
        <div class="back" @click="Back"><i class="iconfont icon-jiantou_zuo"></i></div>
        <div class="switch">
            <div @click="changeCurPage('like')" :class="{light:pageState}">我喜欢的</div>
            <div @click="changeCurPage('history')" :class="{light:!pageState}">最近听的</div>
        </div>
        <div class="radom-play" ref='radomPlay' @click="handleplayRadomMusic">
            <i class="iconfont icon-weibiaoti--"></i>
            随机播放全部
        </div>
        <slide-leftslot   v-show='pageState'>
            <div slot='left' class="list-wrapper" ref='like'>
                <song-list ref='favsongList' @playMusic='playMusic'  :list='collectSong'></song-list>
                <div class="no-container" v-show="!collectSong.length">
                    <no-result desc='没有收藏的音乐'></no-result>
                </div>
            </div>
        </slide-leftslot>
        <slide-rightslot   v-show='!pageState'>
            <div slot="right" class="list-wrapper" ref='history'>
                <song-list ref='historysongList' @playMusic='playMusic'  :list='playHistory'></song-list>
                <div class="no-container" v-show="!playHistory.length">
                    <no-result desc='没有播放历史'></no-result>
                </div>
            </div>
        </slide-rightslot>
        
    </div>
</transition>

</template>

<script>
import SongList from '../common/songs-list'
import SlideLeftslot from '../slide-slot/slide-left'
import SlideRightslot from '../slide-slot/slide-right'

import {mapGetters, mapActions} from 'vuex'
import Song from '@/common/js/song'
import NoResult from '../no-result/no-result'

export default {
    computed:{
        ...mapGetters([
            'collectSong',
            'screen_size',
            'playHistory',
            
        ])
    },
    data (){
        return{
            pageState:true
        }
    },
    watch:{
       
    },
    components:{
        SongList,
        SlideRightslot,
        SlideLeftslot,
        NoResult
    },
    methods:{
        ...mapActions([
            'insertSong',
            'selectMusic',
        ]),
        handleScreenSize (){
            if(!this.screen_size){
                let Bottom = '70px'
                this.$refs.personArea.style.bottom = Bottom
            }else{
                this.$refs.personArea.style.bottom = 0
            }
        },
        Back (){
            this.$router.back()
        },
        changeCurPage(str){
            if(str=='like'){
                this.pageState = true
                setTimeout(()=>{
                    this.$refs.favsongList.handlerefresh()
                },10)
            }else if(str=='history'){
                this.pageState =false
                setTimeout(()=>{
                    this.$refs.historysongList.handlerefresh()
                },20)
            }
        },
        handleplayRadomMusic (){
            let songs = []
            let songlist
            if(this.pageState){
               songlist = this.collectSong
            }else{
               songlist = this.playHistory
            }
            if(!songlist.length){
                return
            }
            for(let i = 0 ; i<songlist.length;i++){
                let song = new Song (songlist[i])
                songs.push(song)
            }
            let Radom=function(min,max) {
                return Math.random()*(max-min+1)+min | 0
            }
            let i = Radom(0,songs.length-1)
            this.selectMusic({
                    list:songs,
                    index:i,
                    screenSize:this.screen_size
                })
        },
        playMusic(item,index){
            console.log(item)
            let song = item
            if (!this.screen_size) {
                this.insertSong({
                song,
                screenSize: false
                })
            } else {
                this.insertSong({
                song,
                screenSize: true
                })
            }
        },
    },
    activated(){
        this.handleScreenSize()
    },

}
</script>

<style lang='stylus' scoped>
@import '~stylus/variable';
    .Enter
        animation SlideInRight cubic-bezier(.2,0,1,1) .5s 1
    .Leave
        animation SlideOutRight cubic-bezier(0,.2,1,1) .5s 1
    .person-area
        position fixed
        top 0
        left 0
        z-index 900
        bottom 0
        right 0
        background-color $color-background
        display flex
        flex-direction column
        .back
            position absolute
            width 5rem
            line-height 4rem
            text-align center
            color $color-them-icon 
            &>.iconfont
                font-size 3rem
        .switch
            color $color-text-d
            display flex
            width 50%
            justify-content center
            margin 0 auto
            line-height 3rem
            padding 1rem 0
            &>div
                width 10rem
                border .1rem solid $color-text-d
                line-height 3rem
                text-align center
                font-size 1.5rem
            div:first-child
                border-top-left-radius .5rem
                border-bottom-left-radius .5rem
            div:nth-child(2)
                border-top-right-radius .5rem
                border-bottom-right-radius .5rem
            .light
                background-color $color-text-d
                color #fff

        .radom-play
            width 15rem
            line-height 3rem
            margin 3rem auto 1rem
            text-align center
            border .1rem solid $color-text-d
            color $color-text-d
            font-size 1.3rem
            letter-spacing .1rem
            border-radius 1.5rem 
        .list-wrapper
            top 13rem
            bottom 0
            width 100%
            position absolute
            overflow hidden
            .no-container
                display flex
                justify-content center
                color $color-text-d
                
@keyframes SlideInRight 
        0%
            transform translateX(-100%)   
        100%
            transform translateX(0)
@keyframes SlideOutRight 
        0%
            transform translateX(0)   
        100%
            transform translateX(100%)

</style>
