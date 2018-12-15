<template>
  <div id="app" ref='wrapper'>

      <home-head></home-head>
      <nav-router></nav-router>
      <players-page></players-page>
      <keep-alive>
          <router-view/>
      </keep-alive>
  </div>
</template>

<script>

import {mapGetters,mapMutations} from 'vuex'
import animate from 'animate.css'
import velocity from 'velocity-animate'
import Vue from 'vue'
Vue.use(animate)

import HomeHead from './components/home/home-head'
import NavRouter from './components/nav/nav-router'
import PlayersPage from './components/PlayersPage/players-page'

export default {
  name: 'App',
  data (){
    return {
    
    }
  },
  computed:{
    ...mapGetters([
      'routeName'
    ]),
    animated (){
    
    }
  },
  components:{
        HomeHead,
        NavRouter,
        PlayersPage
  },
  
  undated(){

  },
  mouted (){

  }
}
</script>

<style lang='stylus' scoped>
@import '~stylus/variable';
 
</style>
