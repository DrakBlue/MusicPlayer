<template>
    <div class="players-page" v-show="play_list.length>0" >

        <transition mode="out-in" name="maxScreen" 
        animate-delay="0s" 
        enter-active-class='animated fadeInUp' 
        leave-active-class="animated fadeOutDown"
        @enter="handleEnter"
        @leave="handleLeave">

            <div class="max-screen" ref="maxscreen"  v-show="screen_size"
            @touchstart.prevent = 'maxScreentouchstart'
            @touchmove.prevent = 'maxScreentouchmove'
            @touchend.prevent = 'maxScreentouchend'>

                    <div ref="maxScreen"  :style="bgImag" class="bgimage"></div>

                    <div class="title" ref="title">
                        <div class="title-icon" @click="changeScreenSize"><i class="iconfont icon-xialajiantouxiao1"></i></div>
                        <div class="title-text">
                            <div class="song-name" v-html="current.name||current_song.name"></div>
                            <div class="singer-name" v-html="current.singer||current_song.singer"><i class="iconfont icon-jiantouzuo"></i></div>
                        </div>
                    </div>
                    <div class="lyric-box" ref='LyricBox'>                
                        <better-scroll class="lyric-page" ref='LyricPage' :data='currentLyric.lines' :scrollFlag='true'>
                            <div>
                                <p class="line" ref='line' :class="{'light':currentlineNum==index}" v-for="(line,index) in currentLyric.lines" :key="line.time">{{line.txt}}</p>
                            </div>
                        </better-scroll>
                    </div>
                <div class="image-box" ref='ImageBox'>
                    <div class="left-and-right-image"><left-right-image ref="LRImage"></left-right-image></div>
                    <div class="song-imag "  ref="maxImage" 
                    @touchstart.stop='maxImagTouchStart'
                    @touchmove.stop='maxImagTouchMove'
                    @touchend.stop='maxImagTouchEnd'>
                            <div class="circle" ref='circle'></div>
                            <img class="imag" :class="rotate"  ref="image"  :src="current_song.image" alt="">  
                    </div>
                 </div>

                <p class="current-lyric"  ref="CurrentLyric">{{currentTxt}}</p>

                <transition mode="in-out"  :duration='500'
                animate-delay="0s"
                enter-active-class='animated fadeIn'
                leave-active-class="animated fadeOut">

                <div class="lar-btn">
                    <div class="l-btn"  :class="{'toogleWidth':toggleBtn }"></div>
                    <div class="r-btn"  :class="{'toogleWidth':!toggleBtn}"></div>
                </div>
                </transition>

                <div class="duration-bar-and-time">
                    <span class="current-time">{{format(currentTime)}}</span>
                    <div class="duration-bar">
                        <music-bar ref='MusicBar' @percentChange='percentChange' :Precent="precent"></music-bar>
                    </div>
                    <span  class="duration-time">{{format(current_song.duration)}}</span>
                </div>
           
                <div class="bottom-icon">
                    <i  @click="changePlayMode" class="iconfont" :class="playMode"></i>
                    <i :class="disableClass" @click="lastSong" class="iconfont icon-shangyishoushangyige"></i>
                    <i  @click.stop="togglePlay"  ref="maxplay"  :class="playClass"></i>
                    <i  @click="nextSong" :class="disableClass" class="iconfont icon-xiayigexiayishou"></i>
                    <i @click="_saveCollectSong(current_song)"
                        :class="{like:changeColor(current_song)}"
                        class="iconfont  icon-xihuan1">
                    </i>
                </div>

            </div>

        </transition>
         
        
        <div class="bootom-nav" v-show="!screen_size"><bootom-players  ref='bootomPlayers'></bootom-players></div>

        <transition mode="in-out" name='minScreen' :duration='1000'
        animate-delay="0s"
        enter-active-class='animated fadeInUp'
        leave-active-class="animated fadeOut">
            <div class="min-screen"   ref="minScreen" @click.stop="changeScreenSize"  v-show="!screen_size"
            @touchstart.prevent='minScreenTouchStart'
            @touchmove.prevent='minScreenTouchMove'
            @touchend.prevent='minScreenTouchEnd'>
                <div class="song-imag" ref='minImage'>
                <img class="imag" :src="current_song.image" :class="rotate" alt="">  
                </div>
                <div class="title-text">
                        <div class="song-name" v-html="current_song.name"></div>
                        <div class="singer-name" v-html="current_song.singer"></div>
                </div>
                <div class="icon">
                    <music-circle :Precent="precent" :radius='minRadius'>
                         <i  ref='minplay' class="icon-mini" @click.stop="togglePlay"  :class="playClass"></i>
                    </music-circle>
                    <i class="iconfont icon-liebiao" @click.stop="playListShow"></i>
                </div>
            </div>
        </transition>
        <play-list ref='PlayListCom'></play-list>
        <audio ref="audio" @ended='end' :src="current_song.url" @canplay="playReady" @error="error" @timeupdate='timeupdate'></audio>
    </div>
</template>

<script>
import {mapGetters,mapMutations, mapActions} from 'vuex'
// js
import Lyric from 'lyric-parser'
import animate from 'animate.css'
import velocity from 'velocity-animate'
import {prefixStyle} from '@/common/js/dom.js'
import {playModeName} from '@/common/js/shuffle.js'

// components
import BootomPlayers from './components/bootomPlayers'
import LeftRightImage from './components/left-right-image'
import BetterScroll from '@/components/common/scroll'
import SongLyric from '../common/song-lyric.vue'
import MusicBar from '../common/musci-bar.vue'
import MusicCircle from '../common/musci-circle.vue'
import PlayList from '../play-list/play-list'
import {PlayModeMixin,CollectSongMixin} from '@/common/js/mixin'



import Vue from 'vue'
Vue.use(animate)
let transform = prefixStyle('transfrom')
let transitionDuration = prefixStyle('transitionDuration') 
let opacity = prefixStyle('opacity')
export default {
    mixins:[PlayModeMixin,CollectSongMixin],
    components:{
        MusicBar,
        MusicCircle,
        BootomPlayers,
        SongLyric,
        LeftRightImage,
        BetterScroll,
        PlayList
    },
    computed:{
        ...mapGetters([
            'stop_play',
            'play_list',
            'screen_size',
            'current_song',
            'current_index',
             'current_song',
             'play_mode',
        ]),
        bgImag (){
            return `background:url(${this.current_song.image}) no-repeat center;`
        },
        playClass(){
            return {
                iconfont:true,
                toggle:true,
                'icon-zanting7':this.toggle,
                'icon-bofang2':!this.toggle
            }
        },
        rotate (){
            if(!this.stop_play){
                return 'play'
            }else{
                return 'play pause'
            }
        },
        disableClass (){
            return this.songReady ? '' :'disable'
        },
        precent (){
            return this.currentTime/this.current_song.duration
        },
    },
    data (){
        return {
            toggle:true,
            songReady:false,
            currentTime:0,
            minRadius:32,
            maxRadius:250,
            currentLyric:'',
            index:0,
            current:{},
            currentlineNum:0,
            toggleBtn:true,
            currentTxt:'',
        }
    },
    
    watch:{
        current_song (newval){
                if(newval.id&&newval.mid){
                    this.SaveHistorySong(newval)
                }
                if(this.play_list.length<=1){
                    this.setPlayMode(playModeName.singerPlay)
                }
                this.currentTime = 0
                if(this.currentLyric){
                    this.currentLyric.stop()
                    this.currentLyric = ''
                    this.currentTxt = ''
                    this.currentlineNum = 0
                    this.currentTime = 0
                }
               if(newval.id){
                    setTimeout(()=>{
                        this.getLyric()
                    },20) 
               }
               clearTimeout(this.timer)
                this.timer=setTimeout(()=>{
                    if(!this.stop_play){
                        this.$refs.audio.play()
                    }
                },0)
                this.current = this.current_song
        },
        stop_play (){
            if(this.stop_play){
                this.toggle = false
                this.$refs.audio.pause()
            }else{
                this.toggle = true
                setTimeout(() => {
                    this.$refs.audio.play()                    
                }, 0);
            }  
        }, 
        index(newIndex){
            this.current = this.play_list[newIndex]
        },
        
    },
    methods:{
        ...mapActions([
        'SaveHistorySong'
        ]),
        playListHidden (){
            this.$refs.PlayListCom.hidden()
        },
        playListShow (){
            this.$refs.PlayListCom.show()
        },
        getLyric(){
            this.current_song.getLyric().then(lyric=>{
                if(this.current_song.lyric!==lyric){
                    return
                }
                this.currentLyric = new Lyric(lyric,this.line_light)
                if(!this.currentLyric){
                    return
                }
                if(!this.stop_play){
                   this.currentLyric.play()
                }
            }) 
        },
        line_light ({lineNum,txt}){
            if(!this.$refs.LyricPage){
                return
            }
            this.currentTxt = txt
            this.currentlineNum = lineNum

            if(lineNum>5){
                this.$refs.LyricPage.scrollToElement(this.$refs.line[lineNum-5],1000)
            }else{
                this.$refs.LyricPage.scrollTo(0,0,1000)
            }
        },
        end (){
            if(this.play_mode == playModeName.singerPlay){
                this.$refs.audio.currentTime = 0
                this.percent = 0
                this.$refs.audio.play()
            }else{
                this.nextSong()
            }

        },
        percentChange (percent){
            this.$refs.audio.currentTime = percent*this.current_song.duration    
            let currentTime = this.$refs.audio.currentTime
            if(this.stop_play){
                this.togglePlay()
            }  
            if(this.currentLyric){
                this.currentLyric.seek(currentTime*1000)
            }
        },
        format (time){
          let  minute = time/60 | 0
          let  second = this._pad(time%60,2)
          return `${minute}:${second}`
        },
        _pad (num,n){
            let len = num.toString().length
            if(len<n){
                num = `0${num}`
                len++
            }
            return num
        },
        timeupdate (e){
            this.currentTime = e.target.currentTime | 0
        },
        error (){
            this.songReady = true
        },
        playReady (){
            this.songReady= true
        },
        ...mapMutations({
            setScreenSize:'SET_SCREEN_SIZE',
            setCurrentIndex:'SET_CURRENT_INDEX',
            setplay:'SET_STOP_PLAY',
        }),
        togglePlay(e){
           this.setplay(!this.stop_play)
           if(this.currentLyric){
               this.currentLyric.togglePlay()
           }
        },
        nextSong (){
            if(this.play_list.length<=1){
                return
            }
            if(!this.songReady){
                return 
            }
            this.songReady = false
            let a = this.current_index
            if(this.current_index<this.play_list.length-1){
                a = a+1
            }else{
                a = 0
            }
            
            this.setCurrentIndex(a)
        },
        lastSong (){
            if(this.play_list.length<=1){
                return
            }
            if(!this.songReady){
                return 
            }
            this.songReady = false
            let a = this.current_index
            if(this.current_index>0){
                a = a -1
            }else{
                a = this.play_list.length-1
            }
            this.setCurrentIndex(a)
        },
        handleEnter(el,done){
            const {x,y,maxW} = this.getPosAndScale()
            velocity(this.$refs.minImage,{marginTop:-(y+maxW*2)+'px',marginLeft:x+'px'},{duration:1000,complete:done})
        },
        handleLeave(el,done){
            setTimeout(()=>{
                velocity(this.$refs.minImage,{marginTop:0,marginLeft:2+'rem',width:'50px',height:'50px'},{duration:1000,complete:done})
            },100)
            
        },
        changeScreenSize (){
            this.setScreenSize(!this.screen_size)
        },
        getPosAndScale(){
            let screenHeight = document.documentElement.clientHeight
            const minW = 50
            const maxW = 250
            const minLeft = 20+minW/2
            const maxLeft = (document.body.offsetWidth/2)
            const minTop = 10
            const maxTop = (screenHeight*0.35+maxW/2)
            const scale = (maxW/minW)
            const x = maxLeft - minLeft
            const y = screenHeight-maxTop-(minW/2+10)
            const top = (screenHeight*0.35)
            return {x,y,maxW}
        },
        
        touchStart (e){
            this.touch.minScreenWidth = this.$refs.minScreen.offsetWidth
            this.touch.OffSetX = 0
            this.touch.touchReady = true
            this.touch.jumpToNext=false
            this.touch.jumpToLast=false
            this.touch.setScreenSizeTrue=false
            this.touch.setScreenSizeFlase =false
            this.touch.startY = e.touches[0].clientY
            this.touch.startX = e.touches[0].clientX  
        },
        toogleBtnShowState (){
            this.toggleBtn = !this.toggleBtn
        },
        touchMove (e,maxX,maxY,dom){
            this.$refs.maxImage.style[transitionDuration] = 0
            if(!this.touch.touchReady){
                return
            }
            let y = e.touches[0].clientY
            this.touch.OffSetY =  this.touch.startY - y
            let x = e.touches[0].clientX
            this.touch.OffSetX = this.touch.startX - x
            if(this.touch.OffSetY >maxY){
                this.touch.setScreenSizeTrue = true
            }else if(this.touch.OffSetY <-maxY){
                this.touch.setScreenSizeFlase = true
            }
            this.$refs.LyricBox.style[transitionDuration] = 0
            if(this.touch.OffSetX>0){
                
                dom.style.transform = `translate3d(${-this.touch.OffSetX}px,0,0)`
            }else{
                dom.style.transform = `translate3d(${-this.touch.OffSetX}px,0,0)`
            }

            if(this.touch.OffSetX>maxX){
                this.touch.jumpToNext = true
            }else if(this.touch.OffSetX<-maxX){
                this.touch.jumpToLast = true
            }

            if(this.touch.OffSetX>maxX-50){
                this.index = this.current_index+1<this.play_list.length ? this.current_index+1 : 0
            }else if(this.touch.OffSetX<-maxX+50){
                this.index = this.current_index-1>=0 ? this.current_index-1 :this.play_list.length-1
            }else{
                this.index = this.current_index
            }
        },
        touchEnd (e,maxX,maxY,dom){
            this.touch.touchReady = false
            if(this.touch.OffSetX>maxX&&this.touch.jumpToNext){
                this.nextSong()
            }else if(this.touch.OffSetX<-maxX&&this.touch.jumpToLast){
                this.lastSong()
            }

            if(this.touch.OffSetY >maxY&&this.touch.setScreenSizeTrue){
                if(Math.abs(this.touch.OffSetY)<Math.abs(this.touch.OffSetX)){
                    dom.style.transform = `translate3d(0,0,0)`
                    return
                }
                this.setScreenSize(true)
                
            }else if (this.touch.OffSetY <-maxY&&this.touch.setScreenSizeFlase){
                if(Math.abs(this.touch.OffSetY)<Math.abs(this.touch.OffSetX)){
                    dom.style.transform = `translate3d(0,0,0)`
                    return
                }
                this.setScreenSize(false)
            }
            dom.style.transform = `translate3d(0,0,0)`
        },
        toggleLyricORCd(flag){
            if(flag==='Lyric'){
                    this.$refs.LyricBox.style.transform = `translate3d(0,0,0)`
                    this.$refs.LyricBox.style.left = 0
                    this.$refs.maxImage.style.left = '-50%'
                    this.touch.state = true
                    this.touch.CurrentLyricState = false
                    this.toggleBtn = false
            }else if(flag === 'Cd'){
                this.$refs.maxImage.style.transform = `translate3d(0,0,0)`
                this.$refs.LyricBox.style.left = '100%'
                this.$refs.maxImage.style.left =  '50%'
                this.touch.CurrentLyricState = true
                this.touch.state = false
                this.toggleBtn = true
            }
        },
        minScreenTouchStart(e){
            this.touchStart(e)    
        },
        minScreenTouchMove(e){
            this.$refs.bootomPlayers.Move(this.touch.OffSetX)
            this.touchMove(e,200,50,this.$refs.minScreen)
        },
        minScreenTouchEnd(e){
            this.$refs.bootomPlayers.MoveEnd()
            this.touchEnd(e,200,80,this.$refs.minScreen)
        },

        maxImagTouchStart(e){
            this.touch.time=0
            this.touchStart(e)
        },
        maxImagTouchMove(e){
            this.touch.time = 0
            this.$refs.LRImage.Move(this.touch.OffSetX)
            this.touchMove(e,200,100,this.$refs.maxImage)
        },
        maxImagTouchEnd(e){
            this.touch.time = 0

            this.$refs.LRImage.MoveEnd()
            this.touchEnd(e,200,80,this.$refs.maxImage)

        },
        maxScreentouchstart(e){ 
            this.touch.touchReady = true
            this.touch.startY = e.touches[0].clientY
            this.touch.startX = e.touches[0].clientX  
            this.touch.maxImageWidth = this.$refs.maxImage.clientWidth
            this.touch.maxImageLeft = this.$refs.maxImage.offsetLeft
        },
        maxScreentouchmove(e){

            if(!this.touch.touchReady){
                return
            }
            let x = e.touches[0].clientX
            let y = e.touches[0].clientY 

            let TouchX = x - this.touch.startX

            let TouchY = y - this.touch.startY
            if(Math.abs(TouchY)>Math.abs(TouchX)){
                return
            }
            this.touch.TouchX = TouchX
            if(TouchX<0&&!this.touch.state){
                    this.$refs.CurrentLyric.style.opacity = Math.min(1,Math.max(0,1-(-TouchX/this.ScreenWidth)))
                    this.touch.toggle = null
                    this.$refs.maxImage.style.transform=`translate3d(${TouchX}px,0,0)`
                    this.$refs.LyricBox.style.transform=`translate3d(${TouchX}px,0,0)`
                if(TouchX<=-200){
                    this.touch.toggle = 'Lyric'
                }
            }else if(TouchX>0&&this.touch.state){
                    this.touch.toggle = null
                    this.$refs.CurrentLyric.style.opacity = Math.min(1,(TouchX/this.ScreenWidth))
                    this.$refs.maxImage.style.transform=`translate3d(${TouchX}px,0,0)`
                    this.$refs.LyricBox.style.transform=`translate3d(${TouchX}px,0,0)`                
                if(TouchX>=200){
                    this.touch.toggle = 'Cd'
                } 
            }
        },
        maxScreentouchend(e){
            if(!this.toggleBtn&&this.touch.TouchX<200&&this.touch.TouchX>0){
                    this.$refs.CurrentLyric.style.opacity = 0
            }else if(this.toggleBtn&&this.touch.TouchX<-200){
                    this.$refs.CurrentLyric.style.opacity = 0
            }else if(!this.toggleBtn&&this.touch.TouchX>200){
                    this.$refs.CurrentLyric.style.opacity = 1                
            }else if (this.toggleBtn&&this.touch.TouchX>-200&&this.touch.TouchX<0){
                    this.$refs.CurrentLyric.style.opacity = 1                
            }
            this.$refs.maxImage.style.transform = `translate3d(0,0,0)`
            this.$refs.LyricBox.style.transform = `translate3d(0,0,0)`
            if(this.touch.toggle==='Lyric'){
                    this.toggleLyricORCd('Lyric')
            }else if(this.touch.toggle === 'Cd'){
                    this.toggleLyricORCd('Cd')
            }
        }
    },
    activated (){
        
    },
    updated (){
        this.$refs.maxScreen.style.backgroundSize = 'cover'
        this.$refs.maxScreen.style.filter = 'blur(50px)'
    },
    mounted (){
        this.handleEnter()
        this.touch.OffSetX = 0

    },
    created (){ 
        this.ScreenWidth = document.body.clientWidth
        this.touch = {}
    }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/variable.styl';
.players-page
    width 100%
    .max-screen
        position fixed
        min-width 0
        top 0
        left 0
        right 0
        bottom 0
        display flex
        flex-direction column
        align-items center
        background-color $color-background-dialog
        z-index 910
        .bgimage
           width 100%
           height 100%
        .title
            position absolute
            width 100%
            height 4rem
            z-index 100
            display flex
            min-width 0
            flex-direction row
            justify-content flex-start
            padding .5rem 0
            .title-icon
                line-height 4rem
                position absolute
                left 1.5rem
                transform scale(2)
                color $color-them-icon 
            .title-text
                width 70%
                line-height 2rem
                margin 0 auto
                text-align center
                .song-name,.singer-name
                    font-size 1.3rem
                    display -webkit-box
                    -webkit-box-orient vertical
                    -webkit-line-clamp 1
                    overflow hidden
                .singer-name
                    font-size 1rem
                    .icon-jiantouzuo
                        top -.12rem
                        margin-left -.3rem
        .lyric-box
            position absolute
            width 100%
            height 69%
            left 100%
            z-index 90
            min-width 0
            overflow hidden;
            .lyric-page
                position absolute
                overflow hidden
                top 6rem
                letter-spacing .05rem
                right 0
                left 0
                box-sizing border-box
                padding 0 2rem
                bottom 0rem
                text-align center
                font-size 1.2rem
                color $color-text-ll
                .line
                    line-height 3rem
                    overflow hidden
                .light
                    color $color-them-icon
        .image-box
            position absolute
            width 100%
            height 100%
            .left-and-right-image
            .song-imag
                position absolute
                height 25rem
                width 25rem
                border-radius (@height/2)
                left 50%
                margin-left -12.5rem
                top 35%
                z-index 9
                margin-top -(@height/2) 
                transform-origin  center
                .circle
                    position absolute 
                    left 50%
                    margin-left -(@width*1.1/2) 
                    z-index 0
                    top 50%
                    margin-top -(@height*1.1/2) 
                    background-color $color-background-highlight
                    width 110%
                    height 110%
                    border-radius (@height*1.1/2)
                .imag
                    position absolute
                    z-index 999
                    border-radius (@height/2)
                    width 100%
                    height 100%
                .play
                    animation: rotate 20s linear infinite
                    animation-fill-mode: backwards
                .pause
                    animation-play-state: paused 
        .current-lyric
            position absolute
            line-height 4rem
            height 4rem
            width 20rem
            top 60%
            font-size 1.5rem
            text-align center
            overflow hidden;
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 1
        .lar-btn
            display flex
            position absolute
            top 73%
            left 50%
            margin-left -2rem
            width 4rem
            height 1rem
            justify-content space-around
            .l-btn,.r-btn
                border-radius 0.5rem
                width 1.2rem
                background-color #fff
                transition: width 2s;
            .toogleWidth
                width 2rem
                background-color $color-them-icon
                transition: width 2s;
        .duration-bar-and-time
            width 92%
            height 8rem
            position absolute
            display flex
            z-index 200
            top 75%
            justify-content space-around
            align-items center
            .duration-bar
                align-self center
            .current-time,.duration-time
                display block
                line-height 2rem
        .bottom-icon
            position absolute
            top 88%
            width 100%
            z-index 999
            display flex
            justify-content space-around
            align-items center
            text-align center
            line-height 5rem
            .iconfont 
                color $color-them-icon 
                font-size 3rem
            .like
                color  rgba(255,50,0,1)
            .disable
                color #ccc
    .bootom-nav,.min-screen
        position fixed
        height 5rem
        width 100%
        bottom 0rem
        background-color $color-background-highlight
        padding 1rem 0
    .min-screen
        z-index 900
        margin-top 4rem
        display flex
        justify-content space-between
        padding 1rem 0
        align-items center
        .song-imag
            width 5rem
            height 0
            padding-bootom 5rem
            border-radius (2.5rem)
            overflow hidden
            text-align center
            margin-left 2rem
            .imag
                width 100%
                border-radius (2.5rem)
            .play
                animation: rotate 20s linear infinite
            .pause
                animation-play-state: paused 
        .title-text
            position absolute
            height 100%
            left 8.5rem
            padding 1rem 0 
            box-sizing border-box
            display flex
            flex-direction column
            justify-content space-around
            .song-name,.singer-name
                line-height 2rem
                font-size 1.5rem
                width 12rem
                overflow hidden
                white-space nowrap
                text-overflow ellipsis
            .singer-name
                font-size 1.4rem
        .icon
            position absolute
            right 1rem
            display flex
            flex-direction row
            align-items center
            height 100%
            width 30%
            box-sizing border-box
            padding 1rem 0
            justify-content space-around
            color $color-them-icon
            .icon-mini
                position absolute
                font-size 3.2rem
                top 0
                left 0
            .iconfont
                font-size 3.2rem
            .icon-liebiao
                transform scale(.9)
            .icon-bofang
                transform scale(1.23)
@keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)              


            
                            
        


</style>    
