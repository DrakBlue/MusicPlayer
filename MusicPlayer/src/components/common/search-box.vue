<template>
    <div class="search-box">
        
       <svg class="icon-svg icon-search" aria-hidden="true"><use xlink:href="#icon-sousuoa-copy"></use></svg>
       <input v-model="Value" class="search" type="text" :placeholder="PlaceHolder">
       <svg @click="Clear" v-show="Value.length"  class="icon-svg icon-remove" aria-hidden="true"><use xlink:href="#icon-shanchua"></use></svg>
    </div>
</template>


<script>
import {Reduce} from '@/common/js/config.js'

export default {
    props:{
        PlaceHolder:{
            type:String,
            default:''
        }
    },
    data(){
        return{
            Value:''
        }
    },
    watch:{
        
    },
    methods:{
        Clear (){
            this.Value = ''
        },
        pushHotKey(item){
            this.Value=item
        }
    },
    created(){
        this.$watch('Value',Reduce((newVal)=>{
               this.$emit('catchValue',newVal)
        },200))
    },
}
</script>

<style lang='stylus' scoped>
@import '~stylus/variable'
@import '~stylus/placeholder';


    .search-box
        display flex
        width 90%
        height 3rem
        margin 2rem  auto 1rem
        position relative
        background-color $color-background-highlight
        border-radius 1.6rem
        line-height 3rem
        box-sizing border-box
        padding-right 1rem
        .search
            flex 1
            background-color $color-background-highlight
            text-indent .8rem
            caret-color $color-them-icon
            color $color-text-ll
            border-radius 1.6rem
            outline none
            letter-spacing .1rem
            border none
            // &::-webkit-input-placeholder,
            // &:-moz-placeholder,
            // &::-moz-placeholder,
            // &:-ms-input-placeholder
            //     line-height 3rem
            //     padding-left 2rem 
        .icon-search
            font-size 3rem
        .icon-remove
            height 3rem
            font-size 2rem
            line-height 3rem
            color #fff
</style>
