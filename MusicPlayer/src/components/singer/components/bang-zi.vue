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
          area:2
        }
      },
      components :{
        SingerList
      }
}
</script>


<style lang="stylus" scoped >
</style>
