<template>
    <div class="sty">
            <svg class="icon logo" aria-hidden="true">  
                    <use xlink:href="#icon--" class="yaowan"></use>  
            </svg> 
        <div class="title">
           药丸音乐
        </div>
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
            padding 1rem 0
            .logo
               width 2rem 
               height 2rem
               padding 0 .2rem
            .title
                letter-spacing .2rem
                color $color-them-icon
              
              
                  
                    
                    



</style>
