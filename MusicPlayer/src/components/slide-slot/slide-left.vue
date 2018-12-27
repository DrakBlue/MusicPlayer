<template>
        <transition
        enter-active-class="slideInLeft"
        leave-active-class="slideOutLeft">
                <slot name="left"></slot>
        </transition>
        
</template>

<script>
export default {

}
</script>

<style lang='stylus' scoped>
    .slideInLeft
        animation  SLIDEINLEFT 1s 1
    .slideOutLeft
        animation   SLIDEOUTLEFT 1s 1

    
@keyframes SLIDEINLEFT 
    0%
        transform translate3d(-100%,0,0)
    100%
        transform translate3d(0,0,0)
@keyframes SLIDEOUTLEFT 
    0%
        transform translate3d(0,0,0)
    100%
        transform translate3d(-100%,0,0)

        
        
    
</style>
