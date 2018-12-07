<template>
    <div ref="wrapper">
        
        <slot></slot>
        
    </div>
 </template>

<script>
import BScroll from 'better-scroll'
export default {
        name:'BetterScroll',
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
                    scrollbar:this.scrollbar
                })
                if(this.scrollFlag){
                    let me = this
                    this.scroll.on("scroll",(pos)=>{
                            me.$emit("onscroll",pos)
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
            scrollstart (){
            //    this.scroll&&this.scroll.on("scroll",this.scrollstart)
            },
            scrollstart (){
                console.log(1)
            }
            
        },
        watch:{
            data (){
                this.refresh()
            }
            
        },
        mounted (){
            setTimeout(()=>{
                this._initScroll()
            },20)
            
        },
        activated (){
            
        }



}
</script>


<style lang="stylus" scoped >

</style>
