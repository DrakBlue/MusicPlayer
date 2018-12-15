<template>
    <div class="radom-box" v-show="Play_Radom" @click="playRadomMusic">
        <i class="iconfont icon-icon-test"></i>
        <span class="text">随机播放全部</span>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    computed:{
         ...mapGetters([
            'Play_Radom'
        ])
    },
    methods:{
        playRadomMusic (){
            this.$emit('playRadomMusic')
        }
    },
    actived (){
       
    }

}
</script>

<style lang="stylus" scoped>
@import '~stylus/variable.styl';

    .radom-box
        position absolute
        top 20rem
        height 3rem
        line-height 3rem
        width 15rem
        border 1px solid $color-them-icon
        border-radius 1.5rem
        display flex
        justify-content center
        color $color-them-icon
        .icon-icon-test
            font-size 2rem
            vertical-align middle
            margin-right .1rem
        .text
            margin-left .1rem
            display inline-block
            margin-top .08rem            
            letter-spacing .1rem
            font-size 1.2rem
            
        
</style>
