<template>
  <div class="progress-circle">
    <slot></slot>
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />
      <circle class="progress-bar" r="50" cx="50" cy="50"  fill="transparent" stroke-dasharray="314"
              :stroke-dashoffset="Dashoffset"/>
    </svg>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      data (){
          return {
              Dashoffset:0
          }
      },
      props:{
          Precent:{
              type:Number,
              default:1
          },
          radius:{
              type:Number,
              default:100
          }
      },
      watch:{
          Precent (newPrecent){
              this.Dashoffset = (1-newPrecent)*314
          }
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~stylus/variable.styl"

  .progress-circle
    position: relative
    margin-top .2rem 
    circle
      stroke-width: 6px
      transform-origin: center
      &.progress-background
        transform: scale(0.9)
        stroke: #ffc58a
      &.progress-bar
        transform: scale(0.9) rotate(-90deg)
        z-index 999
        stroke-width: 12px
        stroke:  #ff5b0d

</style>