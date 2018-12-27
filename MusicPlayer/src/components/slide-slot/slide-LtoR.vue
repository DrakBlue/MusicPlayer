<template>
        <transition
        enter-active-class="InLeft"
        leave-active-class='OutRight'
        mode="in-out">

            <slot></slot>

        </transition>
</template>

<script>
export default {

}
</script>

<style lang='stylus'scoped>
    .InLeft
        animation  SlideInLeft  .5s cubic-bezier(.2,0,1,1) 1
    .OutRight 
        animation  SlideOutRight  .5s cubic-bezier(0,.2,1,1) 1
@keyframes SlideInLeft 
        0%
            transform translateX(-100%)   
        100%
            transform translateX(0)
@keyframes SlideOutRight 
        0%
            transform translateX(0)   
        100%
            transform translateX(100%)   

</style>
