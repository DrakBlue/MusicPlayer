<template>
        <ul class="search-history">
            <ul class="title" v-show="searchs.length">
                <li class="title-text">{{titleName}}</li>
                <li class="title-icon" @click="Clear"><i class="iconfont icon-shanchufg-copy-copy"></i>清空</li>
            </ul>
            
            <ul class="search-container">
                <transition-group tag="ul" name='list'
                leave-active-class="animated slideOutLeft">
                        <li class="search-item" v-for="item in searchs" :key='item' >
                            <span class="key" @click.stop="pushQuestionToSearchBox(item)" v-html="item"></span>
                            <span class="key-icon" @click.stop="selectItemRemove(item)"><i class="iconfont icon-shanchua"></i></span>
                        </li>
                </transition-group>
            </ul>
        </ul>
</template>

<script>
// import {mapGetters,mapActions} from 'vuex'
import animate from "animate.css";

export default {
    props:{
        searchs:{
            type:Array,
            default(){
                return []
            }
        },
        titleName:{
            type:String,
            default:'搜索历史'
        }
    },
    methods:{
        selectItemRemove(item){
            this.$emit('selectRemoveItem',item)
        },
        Clear (){
            this.$emit('clear')
        },
        pushQuestionToSearchBox (item){
            console.log(item)
            this.$emit('push',item)
        },
        refresh(){
            this.$refs.search-history.style.bootom
        }

    }

}
</script>

<style lang='stylus' scoped >
@import '~stylus/variable';

    .search-history
        margin 2rem auto 
        width 90%
        min-width 0
        line-height 3rem
        color $color-text-l
        .title,.search-container
            padding 0 .6rem
            font-size 1.3rem
        .title
            display flex
            justify-content space-between
            .title-text,.title-icon,.key,.key-icon
                width 6rem
                text-align center
                letter-spacing .1rem
        .search-container
            height 100%
            .search-item
                line-height 4rem
                display flex
                min-width 0
                .key-icon 
                    width 6rem
                    text-align center
                .key
                    flex 1
                    text-align left 
                    text-indent .2rem
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                
@keyframes Hidden 
  0% 
    transform: scale(1);
  100% 
    transform: scale(0);

       
    
    


                
</style>
