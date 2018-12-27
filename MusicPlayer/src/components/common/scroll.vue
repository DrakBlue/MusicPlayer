<template>
    <div ref="wrapper" >
        
        <slot></slot>
        
    </div>
 </template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import BScroll from 'better-scroll'
export default {
        name:'BetterScroll',
        computed:{
            ...mapGetters([
                'minPlayState'
            ])
        },
        props:{
            click:{
                type:Boolean,
                default:false
            },
            scrollbar:{
                type:Object,
                defaule:{fade:true,interactive:false}
            },
            probeType:{
                type:Number,
                default:1
            },
            data:{
                type:Array,
                default:null
            },
            scrollFlag:{
                type:Boolean,
                default:false
            },
            scrollFlagSongList:{
                type:Boolean,
                default:false
            },
            stopScrollTOUnder:{
                type:Boolean,
                default:false
            },
            upDataByScroll:{
                type:Boolean,
                default:false
            },
            momentum:{
                type:Boolean,
                default:true
            },
            initDelay:{
                type:Number,
                default:20
            }
        },
        components:{
            
        },
        methods: {
            scrollToElement (){
                if(this.scrollFlag){
                    this.scroll.scrollToElement.apply(this.scroll,arguments)
                }
            },
            scrollTo (){
                if(this.scrollFlag){
                   this.scroll.scrollTo.apply(this.scroll,arguments)
                }
            },
            _initScroll (){
                if(!this.$refs.wrapper){
                    return
                }
                
                this.scroll = new BScroll(this.$refs.wrapper,{
                    probeType:this.probeType,
                    click:this.click,
                    scrollbar:this.scrollbar,
                })

                if(this.upDataByScroll){
                    this.scroll.on('scrollEnd',pos=>{
                        if(pos.y>this.scroll.maxScrollY-50){
                            this.$emit('scrollToEnd')
                        }
                    })
                }
                if(this.scrollFlag){
                    let me = this
                    this.scroll.on("scroll",(pos)=>{
                            let dirY = me.scroll.directionY
                            let maxY = me.scroll.maxScrollY
                            me.$emit("onscroll",pos,dirY,maxY)
                    })
                    this.scroll.on("scrollEnd",(pos)=>{
                            me.$emit("onscrollend",pos)
                    }) 
                }
            },
            enableScroll (){
                this.scroll&&this.scroll.enable()
            },
            disableScroll (){
                this.scroll&&this.scroll.disable()
            },
            refresh (){
                this.scroll&&this.scroll.refresh()
            },
            
            ...mapMutations({
                setMiniPlaterState:'SET_MINPLAYER_STATE'
            }),
            

        },
        watch:{
            data (){
                this.refresh()
            }
            
        },
        mounted (){
            setTimeout(()=>{
                this._initScroll()
            },this.initDelay)            
        },
        activated (){
        },
        created(){
            this.touch={}
        }




}
</script>


<style lang="stylus" scoped >

</style>
