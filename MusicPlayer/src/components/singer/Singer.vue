<template>

  <div class="singer">

    <div class="singer-nav-top" >
      <router-link v-for="item in area" tag="div" :to='"/singer"+item.path' class="type">{{item.name}}</router-link>
       <router-view></router-view>
    </div>

  </div>
</template>

<script>
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
          area:area
      }
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
