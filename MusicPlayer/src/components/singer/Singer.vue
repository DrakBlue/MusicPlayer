<template>

  <div class="singer" ref="singer">
    <div class="singer-nav-top" >
      <router-link v-for="(item,index) in area" tag="div" :to='"/singer"+item.path' class="type" :key="index">{{item.name}}</router-link>
       <transition
        animate-delay="0s" 
        enter-active-class='animated slideInLeft' 
        leave-active-class="animated slideOutLeft">
            <keep-alive>
                    <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import animate from 'animate.css'
import velocity from 'velocity-animate'
import Vue from 'vue'

const routeName = ['/recommend','/singer','/rank','/search']
let  index = 1
const area=[
    {
        name:'全部',
        path:'/all-area',
        id:1
    },
    {
        name:'内地',
        path:'/in-land',
        id:2
    },
    {
        name:'港台',
        path:'/out-land',
        id:3
    },
    {
        name:'欧美',
        path:'/e-a',
        id:4
    },
    {
     name:'日韩',
     path:'/bang-zi',
     id:5
    },
]
export default {
  name: "Singer",
  data (){
      return {
          area:area,
          startX :0,
          
      }
  },
  computed:{
      ...mapGetters([
          
      ])
  },
  methods:{
    ...mapMutations({
      setRouteName:'SET_ROUTE_NAME'
    }),
    touchStart (e){
      this.startX = e.touches[0].clientX
    },
    touchMove(e){
        let x = e.touches[0].clientX
        let X =  this.startX - x
        if(X>100){
          this.$router.push(routeName[2])
        }else if(X<-100){
          this.$router.push(routeName[0])
        }
    },
  },
  activated (){
     this.$refs.singer.addEventListener('touchstart',this.touchStart)
     this.$refs.singer.addEventListener('touchmove',this.touchMove) 
     this.setRouteName('/singer')

  },
  updated(){
  },
  created(){
       
  }
  
};
</script>


<style lang="stylus" scoped >
@import './css/singer.styl';
.singer-nav-top
        height 4rem
        display flex
        align-items center
        margin-top 1rem
        font-size $font-size-m
        .type
            margin 0 .5rem
            padding .5rem .5rem
        .router-link-active
            border-bottom .2rem solid $color-them-icon
            color $color-them-icon
</style>
