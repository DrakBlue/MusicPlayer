<template>
    <div class="nav">
      <router-link tag="div" to="/recommend" class="nav-item">推荐</router-link>
      <router-link tag="div" to="/singer" class="nav-item">歌手</router-link>
      <router-link tag="div" to="/rank" class="nav-item">排行</router-link>
      <router-link tag="div" to="/search" class="nav-item">搜索</router-link>
    </div>
 </template>

<script>
export default {
        name:'HomeHead'
}
</script>


<style lang="stylus" scoped >
@import '~stylus/variable';
    .nav
        display flex
        justify-content space-around
        color $color-text-ll
        font-size $font-size-l 
        text-align center
        .nav-item
            padding .4rem .3rem
        .router-link-active
            border-bottom .2rem solid $color-them-icon
            color $color-them-icon
           
                    
                    



</style>
