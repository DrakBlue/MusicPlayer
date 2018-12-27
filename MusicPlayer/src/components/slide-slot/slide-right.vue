<template>
    <transition
        enter-active-class="slideInRight"
        leave-active-class="slideOutRight">
                <slot name="right"></slot>
    </transition>
</template>

<script>
export default {

}
</script>

<style lang='stylus' scoped>

    .slideInRight
        animation SLIDEINRIGHT 1s 1
    .slideOutRight
        animation  SLIDEOUTRIGHT 1s 1
@keyframes SLIDEINRIGHT 
    0%
        transform translate3d(100%,0,0)
    100%
        transform translate3d(0,0,0)
@keyframes SLIDEOUTRIGHT 
    0%
        transform translate3d(0,0,0)
    100%
        transform translate3d(100%,0,0)

</style>
