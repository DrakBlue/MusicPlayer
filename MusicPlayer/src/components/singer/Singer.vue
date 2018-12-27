<template>

  <div class="singer" ref="singer">
        <div class="singer-nav-top"  >
             <router-link :ref='item.ref' v-for="(item,index) in area"  tag="div" :to='"/singer"+item.path' class="type" :key="index">{{item.name}}</router-link>
        </div>
   <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import animate from 'animate.css'
import velocity from 'velocity-animate'
import Vue from 'vue'

let  index = 1
const area=[
    {
        name:'全部',
        path:'/all-area',
        id:1,
        ref:'ArrArea'
    },
    {
        name:'内地',
        path:'/in-land',
        id:2,
        ref:'InLand'
    },
    {
        name:'港台',
        path:'/out-land',
        id:3,
        ref:'OutLand',

    },
    {
        name:'欧美',
        path:'/e-a',
        id:4,
        ref:'EA'

    },
    {
        name:'日韩',
        path:'/bang-zi',
        id:5,
        ref:'BangZi'

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
  watch:{
    
  },
  methods:{
    ...mapMutations({
    
    }),
  
     
  },
  activated (){
 

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
        width 90%
        height 4rem
        display flex
        align-items center
        margin  0 auto
        margin-top 1rem
        justify-content space-between
        z-index 999
        .type
            font-size 1.2rem
            width 2.4rem
            padding .5rem 0
        .router-link-active
            color $color-them-icon
            transform scale(1.2)
</style>
