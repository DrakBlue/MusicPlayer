<template>
    <div class="title"> 
           <i class="iconfont icon-jiantou_zuo" @click="back"></i>
           <div class="singer-name" v-html="singer.name"></div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    methods:{
        back (){
            this.$router.back()
        }
    },
    computed:{
        ...mapGetters([
            'singer'
        ]),
    }

}
</script>

<style lang="stylus" scoped>
@import '~stylus/variable';
      .title
        height 3rem
        width 100%
        padding .5rem 0 
        position fixed
        z-index 999
        .icon-jiantou_zuo
            color $color-them-icon
            font-size 3rem
            position absolute
        .singer-name
            line-height 3rem
            text-align center
            font-size 1.7rem
</style>
