<template>
    <div class="key-box">
        <div class="title">
            <p class="hot-search">热门搜索</p>
            <p class="change-group" @click="changeHotWord"><i class="iconfont icon-jiantou_zuoyouqiehuan_o"></i>换一批</p>
        </div>
        <ul class="keys"  >
            <li class="key-word" @click="selectKey(item)"  v-for="item in hotWord" :key='item.n'>{{item.k}}</li>
        </ul>
    </div>
</template>

<script>
import {Radom} from '@/common/js/shuffle.js'
export default {
    props:{
        hotKey:{
            type:Array,
            default:[]
        }
    },
    data(){
        return{
            start:0,
        }
    },
    computed:{
        hotWord(){
            return this.hotKey.slice(this.start,this.start+10)
        }
    },
    methods:{
        selectKey(item){
                this.$emit('SelectItem',item.k)
        },
        changeHotWord (){
           this.start=Radom(0,20)
        }
    }
}
</script>

<style lang='stylus' scoped>
@import '~stylus/variable'
    
.key-box
    position relative
    width 90%
    margin 0rem auto 
    top 2rem
    color $color-text-l
    .title
        display flex
        justify-content space-between
        line-height 3rem
        box-sizing border-box
        padding 0 .6rem
        margin 1rem 0 
        .hot-search,.change-group
            font-size 1.3rem   
            letter-spacing .1rem
            width 6rem
            text-align center
    .keys
        display flex
        position relative
        height 10rem
        min-width 0
        justify-content space-between
        box-sizing border-box
        flex-wrap wrap
        text-align center
        overflow hidden
        align-items stretch
        .key-word
            margin 0 .5rem
            padding .1rem .6rem
            line-height 2.5rem
            height 2.5rem
            font-size 1.2rem
            flex-grow 1
            border 1px solid $color-background-highlight
            border-radius .5rem
            overflow hidden
            white-space nowrap

        

</style>
