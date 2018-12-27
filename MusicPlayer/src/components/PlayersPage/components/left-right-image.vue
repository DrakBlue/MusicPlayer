<template>
<!-- 中间部分左右的歌曲图片预览 -->

  <div class="box" ref="maxScreen">
   
            <div class="Left-Image-Box" ref="LeftImageBox" :style="Right">
                    <div class="circle"></div>
                    <img class="imag" :src="leftSong.image" alt="">  
            </div>

   
            <div class="Right-image-Box" ref="RightImageBox" :style="Left">
                    <div class="circle"></div>
                    <img class="imag" :src="rightSong.image" alt="">  
            </div>
  
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {prefixStyle} from '@/common/js/dom.js'
let transform = prefixStyle('transfrom')
let transitionDuration = prefixStyle('transitionDuration')
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
      current_index(newVal){
        if(newVal>=0){
            let rightIndex = this.current_index < this.play_list.length-1? this.current_index + 1 : 0
            let leftIndex = this.current_index > 0 ?  this.current_index - 1 : this.play_list.length - 1
            this.leftSong = this.play_list[leftIndex]
            this.rightSong = this.play_list[rightIndex]
        }
      },
      
  },
  computed: {
    
    ...mapGetters(["current_song", "play_list", "current_index",'minPlayState','screen_size']),
    maxScreenWidth (){
        return document.documentElement.clientWidth
    },
    Right (){
        return `right:${this.maxScreenWidth}px`
    },
    Left (){
        return `left:${this.maxScreenWidth}px`
    }
  },
  methods:{
     Move(X){
        this.$refs.RightImageBox.style.transform= `translate3d(${-X}px,0,0)`
        this.$refs.LeftImageBox.style.transform = `translate3d(${-X}px,0,0)`
      },
      MoveEnd (){
        this.$refs.RightImageBox.style.transform= `translate3d(0,0,0)`
        this.$refs.LeftImageBox.style.transform = `translate3d(0,0,0)`
      }
  },
  updated() {
      
  }
};
</script>

<style lang='stylus' scoped>
@import '~stylus/variable';
.box
    height 100% 
    .Left-Image-Box,.Right-image-Box
                height 100%
                width 100%
                position absolute
                transform-origin right
                .circle
                    position absolute 
                    left 50%
                    margin-left -(25*1.1/2)rem
                    top 50%
                    margin-top -(25*1.1/2)rem 
                    background-color $color-background-highlight
                    width 110%
                    height 110%
                    border-radius (25*1.1/2)rem
                .imag
                    z-index 2
                    position absolute
                    border-radius (@height/2)
                    width 100%
                    height 100%



        
    
            
</style>

