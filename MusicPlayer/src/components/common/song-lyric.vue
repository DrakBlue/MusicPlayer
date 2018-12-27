<template>
    <div>123</div>
</template>

<script>

import {mapGetters,mapMutations} from 'vuex'

export default {
    computed:{
      ...mapGetters([
          'current_song'
      ])  
    },
    methods:{
      
    },
    created (){
    },
    activated(){
      
    }
}
</script>

<style>

</style>
