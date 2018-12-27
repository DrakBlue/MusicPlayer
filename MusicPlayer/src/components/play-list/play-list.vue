<template>
<transition
 enter-active-class='enter'
    leave-active-class='leave' >
    <div class="wrapper"   @click.stop="hidden" v-show="showState">

            <div class="play-list" @click.stop>

                    <ul class="title">
                        <li class="playmode-icon" >
                            <i @click.stop="changePlayMode" class="iconfont" :class="playMode"></i>
                        </li>
                        <li class="add-song" @click="showAddSong">
                            <i class="iconfont icon-tianjia"></i>
                            <span>添加歌曲</span>
                        </li>
                        <li class="clear-icon">
                            <i @click="ShowComfirm" class="iconfont icon-qingchuhuancun"></i>
                        </li>
                    </ul>

                     <confirm  ref='confirm' text='是否清空播放列表' @handleSure='clearCurPlayList'></confirm>
                        <better-scroll :initDelay='300' :scrollFlag='true' :data='play_list' ref='scroll' class="lists">
                                <div >
                                    <transition-group tag="div"
                                    leave-active-class="listLeave">
                                        <ul  class="list" ref="song"  v-for="(song,index) in play_list" :key='song.id' >
                                            <li class="song">
                                                <svg class="icon-svg cursong-icon" aria-hidden="true" v-show="curSongIcon(index)">
                                                    <use xlink:href="#icon-icon-test-copy-copy"></use>
                                                </svg>
                                                <span class="song-name" @click="selectSongPlay(song,index)"  v-html="song.name"></span>
                                            </li>
                                            <li class="song-icon">
                                                <i @click="_saveCollectSong(song)" :class="{like:changeColor(song)}" class="iconfont icon-shoucang"></i>
                                                <i class="iconfont icon-shanchua" @click="remove(song,index)"></i>
                                            </li>
                                        </ul>
                                    </transition-group>
                                </div>
                        </better-scroll>
            </div>
            <div class="close">
                <i class="iconfont icon-xialajiantouxiao" @click="hidden"></i>
            </div>
            <add-song ref='addsong'></add-song>

    </div>

</transition>
</template>

<script>
import {mapGetters,mapMutations,mapActions} from 'vuex'

import BetterScroll from '../common/scroll'
import AddSong from '../add-song/add-song'

import Confirm from '../common/confirm'

import {PlayModeMixin,CollectSongMixin} from '@/common/js/mixin'




export default {
    mixins:[PlayModeMixin,CollectSongMixin],
    computed:{
        ...mapGetters([
            'play_list',
            'current_index',
            'current_song',
            'sequence_list',
            'play_mode'
        ])
    },
    components:{
        BetterScroll,
        Confirm,
        AddSong
    },
    data(){
        return {
            showState:false,
        }
    },
    watch:{
        play_list:{
            handler(newVal,oldVal){
                if(newVal.length<oldVal.length||!newVal.length){
                        return                 
                }
                setTimeout(() => {
                    this.scrollToCurSong(this.current_song)
                }, 100);
            },
            deep:true
        },
        current_song (newVal,oldVal){
          if(newVal==oldVal||!this.showState){
              return
          }
          setTimeout(()=>{
              this.scrollToCurSong(newVal)
          },20)
        }
    },
    methods:{

        showAddSong(){
            this.$refs.addsong.show()
        },
        ShowComfirm (){
            this.$refs.confirm.show()
        },
        remove(song,index){
            this.deletSong(song)
        },
        clearCurPlayList (){
            this.hidden()
            this.clearPlayList()
        },
        ...mapActions([
            'deletSong',
            'clearPlayList'
        ]),
        ...mapMutations({
            setCurrentIndex:'SET_CURRENT_INDEX',
           
        }),
        curSongIcon(index){
            if(index==this.current_index){
                return true
            }
        },
        selectSongPlay (song,index){
           this.setCurrentIndex(index)
        },
        scrollToCurSong (cursong){
            if(!cursong||!this.$refs.scroll){
                return
            }
            let index = this.sequence_list.findIndex(item=>{
                return item.id==cursong.id
            })
            this.$refs.scroll.scrollToElement(this.$refs.song[index],300)
        },
        show(){
            this._searchCollectSong ()
            this.showState = true
            setTimeout(()=>{
                this.$refs.scroll.refresh()
            },20)
            setTimeout(()=>{
                this.scrollToCurSong(this.current_song)
            },100)
        },
        hidden(){
            this.showState = false
        },
    },
    mounted (){
    }


}
</script>

<style lang='stylus' scoped>
@import '~stylus/variable';
    .enter
        animation  Enter .5s cubic-bezier(0.42, 0, 1.0, 1.0) 1
    .leave
        animation Leave .5s cubic-bezier(0, 0, 0.58, 1.0) 1
    .wrapper
        position fixed
        z-index 901
        left 0
        right 0
        bottom 0
        top 0
        display flex
        flex-direction column
        justify-content flex-end
        color $color-text-ll
        .play-list
            position relative
            background-color $color-background-highlight 
            box-sizing border-box
            padding 0 5%
            display  flex
            flex-direction column
            align-content center
            max-height 40rem
            .title
                display block
                width 100%
                text-align center
                line-height 4rem
                color #fff
                .playmode-icon,.clear-icon
                    width 4rem
                    float left
                    .iconfont
                        font-size 2.2rem
                .playmode-icon
                    text-indent 2rem
                .add-song
                    position absolute
                    width 12rem
                    left 50%
                    margin-left -(@width/2) 
                    font-size 1.5rem
                    letter-spacing .1rem
                    .icon-tianjia
                        font-size 2.2rem
                        display inline-block
                        transform translate(.3rem,0)
                .clear-icon
                    float right 
            .lists
                overflow hidden 
                min-height 20rem
                .listLeave
                    animation Hidden .3s 1
                .list
                    line-height 3rem
                    height 3rem
                    display flex
                    .song
                        flex 1
                        font-size 1.5rem
                        position relative
                        white-space nowrap
                        overflow hidden                        
                        text-overflow ellipsis
                        .cursong-icon
                            position absolute
                            width 2rem
                            height 2rem
                            top 50%
                            margin-top -1rem 
                        .song-name
                            display inline-block
                            text-indent 2rem
                    .song-icon
                        width 4rem
                        letter-spacing .1rem
                        text-align center
                        .like
                            color $color-them-icon
        .close
            line-height 4rem
            font-size 1.5rem
            background-color $color-background
            text-align center
            .iconfont
                font-size 2.5rem
@keyframes Enter 
    0%
        transform  translate3d(0,100%,0)
    100%
        transform  translate3d(0,0,0)
@keyframes Leave 
    0%    
        transform  translate3d(0,0,0)
    100%
        transform  translate3d(0,100%,0)
    
@keyframes Hidden 
    0%
        transform translate3d(0,0,0)
    100%
        transform translate3d(-100%,0,0)
    


</style>
