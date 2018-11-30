<template>
  <div id="app" ref='wrapper'>
     <home-head></home-head>
     <nav-router></nav-router>
     <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import HomeHead from './components/home/home-head'
import NavRouter from './components/nav/nav-router'

export default {
  name: 'App',
  components:{
        HomeHead,
        NavRouter
  },
  mouted (){
  }
}
</script>

<style lang='stylus' scoped>
@import '~stylus/variable';
 
</style>
