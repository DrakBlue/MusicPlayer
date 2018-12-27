<template>
    <div class="bg" ref="bg" :style="bgImag">
        <div class="imag-cloth">
            <play-radom @playRadomMusic='playRadomMusic'></play-radom>
        </div>
    </div>
</template>

<script>
import PlayRadom from './play-radom.vue'
import {mapGetters} from 'vuex'
export default {
    components:{
       PlayRadom
    },
    data (){
        return {

        }
    },
    props:{
       showRadom:{
           type:Number
       },
       Image:{
           type:String,
           default:''
       }
    },
    watch:{
    },
    computed:{ 
        bgImag (){
                return `background:url(${this.Image}) no-repeat;backgroundSize:cover;`
        },

    },
    methods:{
       playRadomMusic(){
           this.$emit('handleplayRadomMusic')
       }
    },
    updated (){
        this.$refs.bg.style.backgroundSize = 'cover'
    },
    mounted(){
    },
    created (){
       
    },
    activated(){
        this.$refs.bg.style.paddingBottom = '70%'
        this.$refs.bg.style.zIndex = 0
    }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/variable';
    .bg
      position relative
      width 100%
      padding-bottom  70%
      height 0
      transform-origin top
      background-size cover
      overflow hidden
      transform-origin center
      .imag-cloth
          position absolute
          top 0
          left  0
          right 0
          bottom 0
          background-color $color-background-d
          display flex
          justify-content center
      
    
</style>
