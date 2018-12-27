<template>
    <div class="noresult">
       <svg class="icon-svg icon" aria-hidden="true">
            <use xlink:href="#icon-wuti"></use>
        </svg>
        <p v-html="desc"></p>
    </div>
</template>

<script>
export default {
    props:{
        desc:{
            type:String,
            default:'抱歉,无搜索结果'
        }
    },
    computed:{
       
    }

}
</script>

<style lang='stylus' scoped>

    .noresult
        position relative
        height 20rem
        height 40rem
        overflow hidden
        text-align center
        line-height 3rem
        font-size 2rem
        letter-spacing .1rem
        .icon
            width 20rem
            height 20rem


</style>
