<template>
    <div>
        <img :style="size"  :src="imgUrl" alt="" class="imag">
    </div>
</template>

<script>
export default {
    props:{
        imgUrl:{
            type:String,
            default: require('image/loading.gif')
        },
        size:{
            type:String,
            default:`width:5rem;height:5rem;`
        }
    },
    name:'Loda'
}
</script>

<style lang="stylus" scoped>
    .imag
        width 5rem
        height 5rem 
        display block
        margin 0 auto
</style>
