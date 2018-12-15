<template>
    <div class="players-page" v-show="play_list.length>0" >

        <transition mode="out-in" name="maxScreen" 
        animate-delay="0s" 
        enter-active-class='animated fadeInUp' 
        leave-active-class="animated fadeOutDown"
        @enter="handleEnter"
        @leave="handleLeave">
            <div class="max-screen" ref="maxscreen"  v-show="screen_size" >
                <div ref="maxScreen"  :style="bgImag" class="bgimage"></div>
                <div class="title" ref="title">
                    <div class="icon" @click="changeScreenSize"><i class="iconfont icon-xialajiantouxiao1"></i></div>
                    <div class="title-text">
                        <div class="song-name" v-html="current_song.name"></div>
                        <div class="singer-name" v-html="current_song.singer"><i class="iconfont icon-jiantouzuo"></i></div>
                    </div>
                </div>
                <div class="song-imag"  ref="maxImage">
                    <img class="imag play" :class="rotate" :src="current_song.image" alt="">  
                </div>
                <div class="lyric"></div>
                <div class="duration-bar">
                    <span class="current-time">{{currentTime}}</span>
                    <music-bar></music-bar>
                    <span class="duration-time">{{current_song.duration}}</span>
                </div>
                <div class="bottom-icon">
                    <div class="paly-mode icon"><i class="iconfont icon-shunxubofang"></i></div>
                    <div class="last-song icon" @click="lastSong" :class="disableClass"><i class="iconfont icon-shangyishoushangyige"></i></div>
                    <div class="play-stop icon"  @click.stop="togglePlay"><i  ref="maxplay"  :class="playClass"></i></div>
                    <div class="next-song icon" @click="nextSong" :class="disableClass"><i class="iconfont icon-xiayigexiayishou"></i></div>
                    <div class="like-this icon" ><i class="iconfont  icon-xihuan"></i></div>
                </div>
            </div>
        </transition>
        <transition mode="in-out" name='minScreen' :duration='1000'
        animate-delay="0s"
        enter-active-class='animated fadeInUp'
        leave-active-class="animated fadeOut">
            <div class="min-screen" ref="minScreen" @click.stop="changeScreenSize"  v-show="!screen_size">
                <div class="song-imag" ref='minImage'>
                <img class="imag play" :class="rotate" :src="current_song.image" alt="">  
                </div>
                <div class="title-text">
                        <div class="song-name" v-html="current_song.name"></div>
                        <div class="singer-name" v-html="current_song.singer"></div>
                </div>
                <div class="icon">
                    <i  ref='minplay' @click.stop="togglePlay"  :class="playClass"></i>
                    <i class="iconfont icon-liebiao"></i>
                </div>
            </div>
        </transition>
        <audio ref="audio" :src="current_song.url" @canplay="playReady" @error="error" @timeupdate='timeupdate'></audio>

    </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import animate from 'animate.css'
import velocity from 'velocity-animate'
import Vue from 'vue'
import MusicBar from '../common/musci-bar.vue'

Vue.use(animate)
export default {
    components:{
        MusicBar
    },
    computed:{
        ...mapGetters([
            'stop_play',
            'play_list',
            'screen_size',
            'current_song',
            'current_index',
             'current_song'
        ]),
        bgImag (){
            return `background:url(${this.current_song.image}) no-repeat center;`
        },
        playClass(){
            return {
                iconfont:true,
                toggle:true,
                'icon-zanting11':this.toggle,
                'icon-play':!this.toggle
            }
        },
        rotate (){
            if(this.stop_play){
                return 'pause'
            }else{
                return 'runnig'
            }
        },
        disableClass (){
            return this.songReady ? '' :'disable'
        }
        
    },
    data (){
        return {
            startY:0,
            toggle:true,
            songReady:false,
            currentTime:0
        }
    },
    watch:{
        current_song(){
            this.$nextTick(()=>{
                this.$refs.audio.play()
            })
            this.toggle = true
        },
        stop_play (){
            if(this.stop_play){
                this.$refs.audio.pause()
            }else{
                this.$nextTick(()=>{
                    this.$refs.audio.play()
                })
            }  
        }
    },
    methods:{
        timeupdate (e){
            this.currentTime = e.target.currentTime
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
            setplay:'SET_STOP_PLAY'
        }),
        togglePlay(e){
           this.setplay(!this.stop_play)
           if(this.stop_play){
               this.toggle=false
           }else{
               this.toggle=true
           }
        },
        nextSong (){
            if(!this.songReady){
                return 
            }
            this.songReady = false
            let a = this.current_index
            if(this.current_index<this.play_list.length){
                a++
            }else{
                a = 0
            }
            this.setplay(false)
            this.setCurrentIndex(a)
        },
        lastSong (){
            if(!this.songReady){
                return 
            }
            this.songReady = false
            let a = this.current_index
            if(this.current_index>0){
                a--
            }else{
                a = this.play_list.length-1
            }
            this.setplay(false)
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
            const maxTop = (screenHeight*0.4+maxW/2)
            const scale = (maxW/minW)
            const x = maxLeft - minLeft
            const y = screenHeight-maxTop-(minW/2+10)
            const top = (screenHeight*0.4)
            return {x,y,maxW}
        },
        minScreenTouchStart(e){
            this.startY = e.touches[0].clientY
        },
        minScreenTouchMove(e){
            let y = e.touches[0].clientY
            let Y =  this.startY - y
            if(Y>20){
                this.setScreenSize(true)
            }
        },
        maxScreenTouchStart(e){
            this.startY = e.touches[0].clientY
        },
        maxScreenTouchMove(e){
            let y = e.touches[0].clientY
            let Y =  y- this.startY
            if(Y>100){
                this.setScreenSize(false)
            }
        }
    },
    updated (){
        this.$refs.maxScreen.style.backgroundSize = 'cover'
        this.$refs.maxScreen.style.filter = 'blur(15px)'
        this.$refs.minScreen.addEventListener('touchstart',this.minScreenTouchStart)
        this.$refs.minScreen.addEventListener('touchmove',this.minScreenTouchMove)
        this.$refs.maxscreen.addEventListener('touchmove',this.maxScreenTouchMove)
        this.$refs.maxscreen.addEventListener('touchstart',this.maxScreenTouchStart)
    },
    mounted (){
        this.handleEnter()
    },
    activated (){
        
    },
    created (){ 
    }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/variable.styl';
.players-page
    position absolute
    background-color players-page
    z-index 999
    .max-screen
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        display flex
        flex-direction column
        align-items center
        background-color $color-background 
        z-index 999
        .bgimage
           width 100%
           height 100%
        .title
            position absolute
            width 100%
            height 4rem
            display flex
            flex-direction row
            justify-content flex-start
            padding .5rem 0
            .icon
                line-height 4rem
                position absolute
                left 1.5rem
                transform scale(2)
                color $color-them-icon 
            .title-text
                width 100%
                line-height 2
                text-align center
                line-height 2rem
                .song-name
                    font-size 1.3rem
                .singer-name
                    font-size 1rem
                    .icon-jiantouzuo
                        top -.12rem
                        margin-left -.3rem
        .song-imag
            position absolute
            height 25rem
            width 25rem
            border-radius (@height/2)
            overflow hidden
            top 40%
            margin-top -(@height/2) 
            transform-origin  center
            .imag
                margin 0 auto
                border-radius (@height/2)
                width 100%
                height 100%
            .play
                animation: rotate 20s linear infinite
            .running
                animation-play-state: running
            .pause
                animation-play-state: paused 
        .lyric
            position absolute
            width 50%
            top 65%
            height 2rem
            margin-top -(@height/2)
            background-color #fff
        .duration-bar
            position absolute
            top 82%
            display flex

        .bottom-icon
            position absolute
            width 100%
            height 5rem
            padding 1rem 0
            bottom 1.5rem
            display flex
            flex-direction row
            justify-content space-around
            align-items center
            text-align center
            .icon 
                color $color-them-icon 
                transform scale(2)
            .disable
                    color #ccc
                .icon-play
                    transfrom sacle(3)
            .play-stop,.like-this
                transform scale(3)
    .min-screen
        position fixed
        height 5rem
        width 100%
        z-index 999
        bottom 0rem
        margin-top 4rem
        background-color $color-background 
        border-top 1px solid $color-them-icon 
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
            .runnig
                animation-play-state: running
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
            .iconfont
                transform scale(2.5)
            .icon-liebiao
                transform scale(2)

@keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)              


            
                            
        


</style>    
