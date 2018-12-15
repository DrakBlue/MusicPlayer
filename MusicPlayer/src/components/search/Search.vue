<template>
    <div>
        <img :src="imgUrl" alt="" class="imag">
    </div>
</template>

<script>
import {mapMutations,mapGetters} from 'vuex'

export default {
    name:'Loda',
    props:{
        imgUrl:{
            type:String,
            default: require('image/loading.gif')
        }
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

<style lang="stylus" scoped>
    .imag
        width 5rem
        height 5rem       

        
</style>
