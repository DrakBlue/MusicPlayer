<template>
    <div class="singer-detail">
        <detail-title ref="title" ></detail-title>
        <singer-imag @handleplayRadomMusic="handleplayRadomMusic" ref="bgImag"></singer-imag>
        <songs-list @playMusic='playMusic' @PushSongs='getSongs' ref="songslist" @onscroll="onscroll" ></songs-list>
    </div>
</template>

<script>
import SingerImag from '../common/singer-imag'
import SongsList from '../common/songs-list'
import DetailTitle from '../common/detail-title'
import {mapActions,mapGetters} from 'vuex'
import {prefixStyle} from '@/common/js/dom.js'
let transform = prefixStyle('transfrom')
let filter = prefixStyle('filter')
export default {
    data (){
        return {
            titleHeight:null,
            SongListTop:null,
            Songs:[]
        }
    },
    computed: {
        ...mapGetters([
            'screen_size'
        ]),
    },
    methods:{
        getSongs(songs){
          this.Songs = songs
        },
        handleplayRadomMusic (singer){
            let length = this.Songs.length
            let index  =Math.floor(Math.random()*length) 
            let songs = this.Songs
            this.playMusic(null,index,songs)
        },
        playMusic (item,index,songs){
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
            'selectMusic'     
        ]),
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
    mounted (){
        
    },
    updated(){
        
    },
    created (){
    },
    activated (){
        this.titleHeight = this.$refs.title.$el.offsetHeight
        this.SongListTop =  this.$refs.bgImag.$el.offsetHeight
        this.$refs.songslist.$el.style.top = this.$refs.bgImag.$el.offsetHeight+'px'
        // this.$refs.playradom.$el.style.top = this.$refs.bgImag.$el.offsetHeight/1.2+'px'
    },
    components: {
        DetailTitle,
        SingerImag,
        SongsList,

    },
    

    
}
</script>

<style lang="stylus" scoped>
@import '~stylus/variable';
 .singer-detail
     position fixed
     width 100%
     top 0 
     bottom 0
     left 0
     bottom 0
     overflow hidden
     z-index 1
     background-color $color-background 
    
     
</style>
