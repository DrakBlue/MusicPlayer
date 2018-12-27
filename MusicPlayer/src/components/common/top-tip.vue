<template>
<transition 
    enter-active-class="Enter"
    leave-active-class="Leave">
    <div class="top-tip" v-show="showState">
       <slot></slot>
    </div>
</transition>
</template>

<script>
export default {
    data (){
        return{
            showState:false
        }
    },
    methods:{
        show (){
            this.showState = true
        },
        hidden (){
            this.showState =false
        }
    }
}
</script>

<style lang='stylus' scoped>
    .Enter
        animation sildeInTop .5s cubic-bezier(.5,0,1,1)  1
    .Leave
        animation sildeOutTop .5s cubic-bezier(.5,0,1,1) 1

@keyframes  sildeInTop
    0%
        transform translate3d(0,-100%,0) 
    100%
        transform translate3d(0,0,0)


@keyframes sildeOutTop
    0%
        transform translate3d(0,0,0)
    100%
        transform translate3d(0,-100%,0)

    
        
    

</style>
