<template>
   <div>
     <singer-list :area='area'></singer-list>
   </div>
 </template>

<script>
import SingerList from '../../common/singer-list'


export default {
      data(){
        return {
          area:3
        }
      },
      components :{
        SingerList
      }
}
</script>


<style lang="stylus" scoped >
</style>
