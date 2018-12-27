<template>
    <div class="nav" @click="RouteNameChange">
      <router-link ref="recommend"   tag="div" to="/recommend" class="nav-item">推荐</router-link>
      <router-link ref='singer'  tag="div" to="/singer" class="nav-item">歌手</router-link>
      <router-link ref='rank'   tag="div" to="/rank" class="nav-item">排行</router-link>
      <router-link ref='search'   tag="div" to="/search" class="nav-item">搜索</router-link>
      <div class="bottom-line" ref="BootomLine"></div>
    </div>
 </template>

<script>


import { mapGetters, mapMutations } from 'vuex'
export default {
        computed:{
            ...mapGetters([
                'routeName'
            ])
        },
        watch:{
            routeName (newVal){
                this.BootomLineMove (newVal)
                
            }
        },
        name:'HomeHead',
        methods:{
            BootomLineMove (routeName){
                let left1 = this.$refs.recommend.$el.offsetLeft
                let left2 = this.$refs.singer.$el.offsetLeft
                let left3 = this.$refs.rank.$el.offsetLeft
                let left4 = this.$refs.search.$el.offsetLeft
                switch (routeName) {
                    case 'Recommend' :
                        this.$refs.BootomLine.style.left = left1 + 'px';
                        break;
                    case 'ArrArea' :
                        this.$refs.BootomLine.style.left = left2 + 'px';
                        break;
                    case 'Rank' :
                        this.$refs.BootomLine.style.left = left3 + 'px';
                        break;
                    case 'Search' :
                        this.$refs.BootomLine.style.left = left4 + 'px';
                        break;
                }
            },
            RouteNameChange(){
                this.setRouteName(this.$route.name)
            },
            ...mapMutations({
                setRouteName:'SET_ROUTE_NAME'
            })
        },
        mounted(){
            window.addEventListener('beforeunload', this.BootomLineMove(this.$route.name))
        },
        destroyed (){
            window.removeEventListener('beforeunload', this.BootomLineMove(this.$route.name))
        },
        created (){
        },
        activated (){

        }
}
</script>


<style lang="stylus" scoped >
@import '~stylus/variable';
    .nav
        position relative
        display flex
        justify-content center
        color $color-text-ll
        font-size $font-size-l 
        text-align center
        justify-content space-between
        padding 0 5% .5rem 5%
        z-index 1
        .nav-item
            width 3.2rem
        .bottom-line
            position absolute
            left 5%
            bottom 0
            height .2rem
            border-radius .5rem
            width 3.2rem
            background-color $color-them-icon
            transition: left .5s


           
                    
                    



</style>
