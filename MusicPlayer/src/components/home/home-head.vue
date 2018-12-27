<template>
    <div class="sty">
        <svg class="icon-svg" aria-hidden="true"><use xlink:href="#icon--"></use></svg>
        <div class="title">
           PillMusic
        </div>
        <router-link to='/person' tag='div' class="person"><i  class="iconfont icon-geshousad"></i></router-link>
    </div>
 </template>

<script>
export default {
        name:'HomeHead'
}
</script>


<style lang="stylus" scoped >
    @import '~stylus/variable.styl';
        .sty
            font-size $font-size-xl
            display flex
            justify-content center
            align-items center
            line-height 4.5rem
            .title
                letter-spacing .2rem
                color $color-them-icon
            .person
                position absolute
                right 5%
                text-align right
                &>.iconfont
                    font-size 2.5rem
                    color $color-them-icon
                  
                     
                    



</style>
