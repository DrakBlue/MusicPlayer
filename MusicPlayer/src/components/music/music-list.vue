<template>

    <div class="singer-detail">
            <detail-title  :singerName = 'title'   ref="title" ></detail-title>
            <singer-imag :Image = 'image'  @handleplayRadomMusic="handleplayRadomMusic"  ref="bgImag"></singer-imag>
            <songs-list :rank="rank" v-show="!SongList.length==0"  :list = 'SongList'   @playMusic='playMusic'  ref="songslist" @onscroll="onscroll" ></songs-list>
            <div class="load" v-show="SongList.length==0">
                <load-component></load-component>
            </div>
    </div>

</template>

<script>
//js

import {prefixStyle} from '@/common/js/dom.js'


//components
import SingerImag from '../common/singer-imag'
import SongsList from '../common/songs-list'
import LoadComponent from "../common/load";
import DetailTitle from '../common/detail-title'

//vuex
import {mapActions,mapGetters,mapMutations} from 'vuex'
import {playModeName} from '@/common/js/shuffle'


let transform = prefixStyle('transfrom')
let filter = prefixStyle('filter')

export default {
    components:{
     
    },
    props:{
        rank:{
            type:Boolean,
            default:false
        },
        SongList:{
            type:Array,
            default:[]
        },
        image:{
            type:String,
            default:''
        },
        title:{
            type:String,
            default:''
        }
    },
    data (){
        return {
            titleHeight:null,
            SongListTop:null,
        }
    },
    computed: {
        ...mapGetters([
            'screen_size',
            'Play_Radom',
        ]),
    },
    watch:{
       

    },
    methods:{
        handleplayRadomMusic (){
            let songs = this.SongList
            let Radom=function(min,max) {
                return Math.random()*(max-min+1)+min | 0
            }
            let i = Radom(0,songs.length-1)
            this.selectMusic({
                    list:songs,
                    index:i,
                    screenSize:this.screen_size
                })
        },
        playMusic (item,index,songs=this.SongList){
            console.log(item)
            if(!this.screen_size){
                    this.selectMusic({
                    list:songs,
                    index,
                    screenSize:false
                })
            }else{
                    this.selectMusic({
                    list:songs,
                    index,
                    screenSize:true
                })    
            }
        },  
        ...mapActions([
            'selectMusic',
            'RadomPlay'     
        ]),
        ...mapMutations({
            setPlayMode:'SET_PLAY_MODE',
        }),
        onscroll (pos,dirY,maxY){
            this.$refs.bgImag.$el.style.filter=`blur(0)`
            let y = pos.y
            if(pos.y>0){
                let  Scale =Math.max(1,(y/3+100)/100)
                this.$refs.bgImag.$el.style.transform=`scale(${Scale})` 
            }
           if(this.SongListTop&&this.titleHeight){
               y=-y
               let distance = this.SongListTop-this.titleHeight
               if(dirY==0||dirY==1){
                   this.$refs.bgImag.$el.style.filter=`blur(${y/20}px)`
                   if(y>=distance){                       
                        this.$refs.bgImag.$el.style.filter=`blur(0)`
                        this.$refs.bgImag.$el.style.paddingBottom = '40px'
                        this.$refs.bgImag.$el.style.zIndex= 99
                    }
               }
           }
           if(dirY==-1||dirY==0){
               let distance = this.SongListTop-this.titleHeight
                if(pos.y>=-distance){
                    this.$refs.bgImag.$el.style.paddingBottom = '70%'
                    this.$refs.bgImag.$el.style.zIndex = 0
                }
            }
        },
        
    },
    created (){
    },
    activated (){

        this.titleHeight = this.$refs.title.$el.offsetHeight
        this.SongListTop =  this.$refs.bgImag.$el.offsetHeight
        if(this.SongList){
            this.$refs.songslist.$el.style.top = this.$refs.bgImag.$el.offsetHeight+'px'
        }
    },
    components: {
        DetailTitle,
        SingerImag,
        SongsList,
        LoadComponent
    }, 
}
</script>

<style lang="stylus" scoped>
@import '~stylus/variable';

 .singer-detail
     position absolute
     width 100%
     top 0 
     bottom 0
     left 0
     bottom 0
     overflow hidden
     z-index 71
     background-color $color-background 
     .load
           width 10rem
           height 10rem
           position fixed
           margin-top 40%
           left 50%
           margin-left -(@width/2) 
             

     
</style>
