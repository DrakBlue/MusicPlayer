<template>
    <div class="all-duration">
        <div class="played-duration"><i class="iconfont icon-yinle1"></i></div>
        
    </div>
</template>

<script>
export default {
    
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
          width 2rem
          height .5rem
          border-radius .25rem      
          background-color $color-them-icon
          .icon-yinle1
              position absolute
              transform scale(0.8)
              right -1.28rem
              top 50%
              margin-top -(1.344/2)rem
              color $color-them-icon
</style>
