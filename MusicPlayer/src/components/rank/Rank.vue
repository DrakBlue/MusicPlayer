<template>
    <div>
        Rank
    </div>
 </template>

<script>
import {mapMutations,mapGetters} from 'vuex'

export default {
        name:'Rank',
        components:{

        },
        methods:{
            ...mapMutations({
                setRouteName:'SET_ROUTE_NAME'
            })
        },
        activated (){
            this.setRouteName('/search')
        }
}
</script>


<style lang="stylus" scoped >

</style>
