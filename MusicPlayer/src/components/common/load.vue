<template>
    <div>
        <img :src="imgUrl" alt="" class="imag">
    </div>
</template>

<script>
export default {
    props:{
        imgUrl:{
            type:String,
            default: require('image/loading.gif')
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
