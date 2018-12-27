<template>
    <div class="all-duration" ref="allDuration" @click="jump">
        <div class="played-duration" ref='playedDuration'>
            <i ref='icon' class="iconfont icon-yuan"
            @touchstart.stop.prevent='iconTouchStart'
            @touchmove.stop.prevent='iconTouchMove'
            @touchend.stop.prevent='iconTouchEnd'></i>
            </div> 
    </div>
</template>

<script>
export default {
    data (){
        return{
            startX:0,
        }
    },
    props:{
        Precent:{
            type:Number,
            deafult:0
        },

    },
    computed:{
        allDurationWidth(){
            return this.$refs.allDuration.clientWidth-4
        }
    },
    watch:{
        Precent(newPrecent){
           if(newPrecent>0&&!this.touch.touchReady){
               let x = newPrecent*this.allDurationWidth
               this.$refs.playedDuration.style.width = `${x}px`
           }
        }
    },
    methods:{
        jump (e){
            //bug，点击小球位置跳转回起点
            // let shiftX = e.offsetX
            let rect = this.$refs.allDuration.getBoundingClientRect()
            let shiftX = e.pageX - rect.left
            this.$refs.playedDuration.style.width = `${shiftX}px`
            this.changePercent()
        },
        iconTouchStart(e){
            this.touch.touchReady = true
            this.touch.startX = e.touches[0].clientX
            this.touch.left = this.$refs.playedDuration.clientWidth
        },
        iconTouchMove(e){
            if(!this.touch.touchReady){
                return
            }
            const x = e.touches[0].pageX-this.touch.startX

            const  shiftX = Math.min(this.allDurationWidth,Math.max(0,x+this.touch.left))
            this.$refs.playedDuration.style.width = `${shiftX}px`
        },
        iconTouchEnd (e){
            this.changePercent()
            this.touch.touchReady = false
        },
        changePercent (){
            const playedDurationWidth = this.$refs.playedDuration.clientWidth
            const percent = playedDurationWidth /this.allDurationWidth
            this.$emit('percentChange',percent)
        }
    },
    created (){
        this.touch = {}
    },
    activated (){
    },
}
</script>

<style lang="stylus" scoped>
@import '~stylus/variable.styl';
.all-duration 
      width 28rem
      height .5rem
      background-color $color-background-highlight
      border-radius .25rem
      margin 0 auto
      .played-duration
          position relative
          width 0
          height .5rem
          border-radius .25rem      
          background-color $color-them-icon
          transition width(.5s)
          .icon-yuan
              position absolute
              right -.8rem
              top 50%
              margin-top -.84rem 
              color $color-them-icon
</style>
