<template>
<!-- 底部左右的歌曲预览 -->

  <div class="box" ref="minScreen" v-show="!screen_size">
      
            <div class="min-screen" ref="LeftSong" style="right:100%;">
                <div class="song-imag" ref='minImage'>
                    <img class="imag play" :src="leftSong.image" alt="">  
                </div>
                <div class="title-text">
                        <div class="song-name" v-html="leftSong.name"></div>
                        <div class="singer-name" v-html="leftSong.singer"></div>
                </div>
                <div class="icon">
                    <i class="iconfont  icon-bofang"></i>
                    <i class="iconfont icon-liebiao"></i>
                </div>
            </div>
            <div class="min-screen" ref="RightSong"  style="left:100%;">
                <div class="song-imag" ref='minImage'>
                    <img class="imag play" :src="rightSong.image" alt="">  
                </div>
                <div class="title-text">
                        <div class="song-name" v-html="rightSong.name"></div>
                        <div class="singer-name" v-html="rightSong.singer"></div>
                </div>
                <div class="icon">
                    <i class="iconfont  icon-bofang"></i>
                    <i class="iconfont icon-liebiao"></i>
                </div>
            </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  props:{
      
      
  },
  data (){
      return{
          leftSong:{},
          rightSong:{},
      }
  },
  watch:{
      current_index(){
        if(this.current_index>0){
            let rightIndex = this.current_index < this.play_list.length-1? this.current_index + 1 : 0
            let leftIndex = this.current_index > 0 ?  this.current_index - 1 : this.play_list.length - 1
            this.leftSong = this.play_list[leftIndex]
            this.rightSong = this.play_list[rightIndex]
        }
      },
      
  },
  computed: {
    
    ...mapGetters(["current_song", "play_list", "current_index",'minPlayState','screen_size']),
    minScreenWidth (){
        return this.$refs.minScreen.clientWidth
    }
  
  },
  methods:{
      Move(X){
          if(X>0){
            this.$refs.RightSong.style.left = `${this.minScreenWidth-X}px`
          }else{
            this.$refs.LeftSong.style.right = `${this.minScreenWidth+X}px`
          }
      },
      MoveEnd(){
        this.$refs.LeftSong.style.right= '100%'
        this.$refs.RightSong.style.left = '100%'
      }

  },
  updated() {
     
  }
};
</script>

<style lang='stylus' scoped>
@import '~stylus/variable';
.box
    z-index 999
    .min-screen
        position absolute
        height 5rem
        width 100%
        z-index 999
        bottom 0rem
        margin-top 4rem
        background-color $color-background-highlight 
        display flex
        justify-content space-between
        padding 1rem 0
        align-items center
        .song-imag
            width 5rem
            height 5rem
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
 
    


        
    
            
</style>

