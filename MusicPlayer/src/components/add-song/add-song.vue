<template>
  <div class="wrapper" v-show="Showstate " @click.stop>
    <top-tip ref='topTip' @click="hiddenTip" class="topTip">
            添加了一首歌曲到播放列表
    </top-tip>
    <ul class="title">
      <li ref="leftbtn" :class="{White:classFlag&&!Question}" @click.stop="linemove('left')">
        <span>最近播放</span>
      </li>
      <li ref="rightbtn" :class="{White:!classFlag&&!Question}" @click.stop="linemove('right')">
        <span>搜索历史</span>
      </li>
      <li class="line-box" v-show="!Question" ref="line">
        <span ref="LINE" class="line"></span>
      </li>
      <i class="iconfont icon-zuji" :class="{light:Question}"></i>
      <i @click="hidden" class="iconfont icon-shanchuguanbicha"></i>
      <i @click="confirmShow" class="iconfont icon-qingchuhuancun"></i>
    </ul>

    <search-box @catchValue="catchValue" ref="searchBox" :PlaceHolder="PlaceHolder"></search-box>
      <search-request
      :upDataByScroll="upDataByScroll"
      ref="SearchRequst"
      @catchMoreData="catchMoreReuqeset"
      @SelectSong="playSong"
      @SelectSearch="saveSearchKey"
      v-show="Question"
      :zhidaContainer="zhidaContainer"
      :songList="songList"
      :loadState="!catchEnd"
      :zhidaShow="zhidaShow"
    ></search-request>
    <confirm :text="confirmText" ref="confirm" @handleSure="clear"></confirm>

    <slide-leftslot v-show="screenState&&!Question">
        <swiper slot="left" :options="swiperOption" class="phistory" ref="phistory" >
        <swiper-slide
            ref="scroll"
            class="song-list"
            :data="playHistory"
            v-for="(item,index) in SongsList"
            :key="index">
            <transition-group tag="ul" leave-active-class="ListLeave">
            <li class="song" v-for="song in item" :key="song.id">
                <p @click="playSong(song)">
                <span @click.stop="deleteOne(song)">
                    <i class="iconfont icon-shanchu_"></i>
                </span>
                <span v-html="song.name"></span>
                <span>-</span>
                <span v-html="song.singer"></span>
                </p>
            </li>
            </transition-group>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </slide-leftslot>
   <slide-rightslot v-show="!screenState&&!Question">
        <swiper slot='right' :options="swiperOption" class="shistory" ref="fav"  >
        <swiper-slide
            ref="scroll"
            class="song-list"
            :data="playHistory"
            v-for="(item,index) in searchList"
            :key="index">
            
            <transition-group tag="ul" leave-active-class="ListLeave">
            <li class="song" v-for="key in item" :key="key">
                <p @click="SelectItem(key)">
                <span @click.stop="removeOneItem(key)">
                    <i class="iconfont icon-shanchu_"></i>
                </span>
                <span v-html="key" @click="SelectItem"></span>
                </p>
            </li>
            </transition-group>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        </swiper>        
  </slide-rightslot>
  </div>
</template>



<script>
import SearchBox from "../common/search-box";
import Confirm from "../common/confirm.vue";
import { mapGetters, mapActions } from "vuex";

import { searchMixin } from "@/common/js/mixin";
import BetterScroll from "../common/scroll";
import SearchRequest from "../search-request/search-request";
import SearchHistory from "../search-history/search-history.vue";
import TopTip from '../common/top-tip'

import SlideLeftslot from '../slide-slot/slide-left'
import SlideRightslot from '../slide-slot/slide-right'

export default {
  mixins: [searchMixin],
  components: {
    SearchBox,
    Confirm,
    SearchRequest,
    SearchHistory,
    BetterScroll,
    TopTip,
    SlideLeftslot,
    SlideRightslot
  },
  computed: {
    ...mapGetters(["playHistory", "screen_size"]),
    classFlag() {
      if (this.screenState) {
        return true;
      } else {
        return false;
      }
    },
    SongsList() {
      return this.ProperData(this.playHistory);
    },
    searchList (){
      return this.ProperData(this.search_history)
    },
    confirmText (){
      if(this.screenState){
        return '是否清空播放历史'
      }else{
        return '是否清空搜索历史'
      }
    },
  },
  data() {
    return {
      zhidaShow: false,
      screenState: true,
      Showstate: false,
      PlaceHolder: "搜索歌曲",
      swiperOption: {
        pagination: ".swiper-pagination",
        paginationType: "fraction",
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        paginationClickable: false,
        autoplayDisableOnInteraction: false,
        routeFlag: true
      }
    };
  },
  methods: {
    ProperData(list) {
      let pages = [];
      list.forEach((item, index) => {
        let page = Math.floor(index / 15);
        if (!pages[page]) {
          pages[page] = [];
        }
        pages[page].push(item);
      });
      return pages;
    },
    ...mapActions(["RemovePlayHistoryOne", "insertSong", "ClearPlayHistory"]),
    confirmShow() {
      this.$refs.confirm.show();
    },
    hiddenTip (){
      this.$refs.topTip.hidden()
    },
    clear() {
      if (this.screenState) {
        this.ClearPlayHistory()
      }else if(!this.screenState){
        this.clearSearchHistory()
      }
    },
    playSong(song) {
      this.$refs.topTip.show()
      if(this.timer){
        clearTimeout(this.timer)
      }
      this.timer=setTimeout(() => {
        this.$refs.topTip.hidden()
      },1000);
      if (!this.screen_size) {
        this.insertSong({ song, screenSize: false });
      } else {
        this.insertSong({ song, screenSize: true });
      }
      
    },
    deleteOne(song) {
      this.RemovePlayHistoryOne(song);
    },
    show() {
      this.Showstate = true;
    },
    hidden() {
      this.Showstate = false;
    },
    linemove(dir) {
      this.lineMove(dir);
    },
    lineMove(dir) {
      if (dir == "left") {
        let left = this.$refs.leftbtn.offsetLeft;
        this.$refs.line.style.left = left + "px";
        this.screenState = true;
      } else if (dir == "right") {
        let left = this.$refs.rightbtn.offsetLeft;
        this.$refs.line.style.left = left + "px";
        this.screenState = false;
      }
    }
  },
  created() {
    this.touch = {};
  }
};
</script>

<style lang='stylus' scoped>
@import '~stylus/variable';

.wrapper 
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bootom: 0;
  background-color: $color-background;
  display: flex;
  z-index: 999;
  flex-direction: column;
  justify-content: flex-start;
  color: $color-text-l;
  .topTip
    position absolute
    width 100%
    text-align center
    background-color  $color-background-highlight
    z-index 999
    line-height 4rem
    font-size 1.5rem
  .title 
    line-height: 4rem;
    display: flex;
    justify-content: center;
    letter-spacing: 0.1rem;
    position: relative;

    .iconfont 
      position: absolute;
      display: inline-block;
      width: 6rem;
      text-align: center;
      color: $color-text-l;
      font-size: 2.5rem;
    .light
      color $color-them-icon
    .icon-shanchuguanbicha 
      left: 0;
    .icon-qingchuhuancun
      right: 0;
    li 
      width: 30%;
      text-align: center;
      font-size: 1.5rem;
    

    .White 
      color: #fff;
    

    .line-box 
      position: absolute;
      height: 0.3rem;
      bottom: 0.5rem;
      left: 20%;
      transition: left 1s;

      .line 
        display: block;
        width: 3rem;
        height: 0.3rem;
        margin: 0 auto;
        background-color: $color-them-icon;
        border-radius: 0.15rem;
      
 

  

  .phistory, .shistory 
    position: absolute;
    top: 12rem;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
 
  .phistory,.shistory  
    width: 80%;
    margin 2rem auto
    line-height 3rem
    &>>>.swiper-pagination-bullet 
      background-color: $color-text-lll;
    

    &>>>.swiper-pagination-bullet-active 
      background-color: $color-them-icon;
    

    .song-list 
      width: 85%;
      height 50rem
      margin: 0 auto;
      font-size: 1.3rem;
      overflow: hidden;
      .ListLeave 
        animation: Hidden 0.3s 1;
      .song 
        display: flex;
        min-width: 0;
        justify-content: space-between;
        width: 100%;
        letter-spacing: 0.1rem;
        p 
          width 25rem
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        
      


    &>>>.swiper-pagination-bullet 
      background-color: $color-text-lll;
    

    &>>>.swiper-pagination-bullet-active 
      background-color: $color-them-icon;
    
  


@keyframes Hidden 
  0% 
    transform: scale(1);
  

  100% 
    transform: scale(0);
  





    

</style>
