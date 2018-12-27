<template>
<div>
  <transition name="slide">
    <better-scroll ref="refresh" class="recommend">
      <div>
        <div class="slider">
          <swiper :options="swiperOption" class="slider-package">
            <swiper-slide v-for="item in slider" :key="item.id" class="slide-item">
              <a :href="item.linkUrl">
              <img :src="item.picUrl" alt class="img-slide">
              </a>
              
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div ref="rocommedHot">
          <div class="song-mean">热门歌单</div>
          <load-component class="load" v-show="!List.length"></load-component>
          <div  v-for="(page,index) in pages" class="page" :key="index">
            <div v-for="item in page" :key="item.dissid">
              <div class="item-page">
                <div class="page-imag" @click="Jump(item)">
                  <img @load="refresh" v-lazy="item.imgurl" style="width:10rem;height:10rem;">
                  <div class="icon">
                    <div class="singer-num">
                      <svg class="icon-svg iconfont" aria-hidden="true"><use xlink:href="#icon-icon-test-copy-copy"></use></svg>
                      <span class="test-num">{{(item.listennum/10000).toFixed(1)}}万</span>
                    </div>
                    <i class="iconfont icon-shuangsechangyongtubiao-"></i>
                  </div>
                </div>
                <div class="item-des">
                  <svg class="icon-svg yaowan" aria-hidden="true"><use xlink:href="#icon-yaowan1"></use></svg>
                  <div v-text="item.dissname" class="des"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </better-scroll>
   
  </transition>
  <keep-alive>
        <router-view></router-view>
  </keep-alive>
  </div>
</template>

<script>
import { getRcommendSlide, getDiscList } from "api/getRecommend.js";
import { OK } from "api/config";
import BScroll from "better-scroll";
import axios from "axios";
import BetterScroll from "../common/scroll";
import LoadComponent from "../common/load";
import { mapMutations } from 'vuex';
import {playlistMixin} from '@/common/js/mixin.js'
const routeName = ['/recommend','/singer','/rank','/search']
let  index = 0

export default {
  mixins: [playlistMixin],
  name: "Recommend",
  data: function() {
    return {
      swiperOption: {
        pagination: ".swiper-pagination",
        loop: true,
        speed: 400,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        autoplay: 5000,
        paginationClickable: false,
        autoplayDisableOnInteraction: false,
        routeFlag:true
      },
      scrollReq: false,
      timer: null,
      slider: null,
      songList: null,
      List: []
    };
  },
  components: {
    BetterScroll,
    LoadComponent
  },
  methods: {
    Jump(item){
      this.$router.push({
          path:`/recommend/${item.dissid}`
      })
      this.setdisc(item)
    },
    handlePlaylist (playlist){
        const Bottom = playlist.length > 0 ? '70px' : ''
        this.$refs.refresh.$el.style.bottom = Bottom
        this.$refs.refresh.refresh()
    },
    ...mapMutations({
      setdisc:'SET_DISC',
      setsinger:'SET_SINGER'
    }),
    _getrecommend() {
      getRcommendSlide().then(res => {
        if (res.code == OK) {
          this.slider = res.data.slider;
          this.songList = res.data.songList;
        }
      });
    },
    _getrecommendContaine() {
      getDiscList().then(res => {
        if (res.code == OK) {
          this.List = res.data.list;
        }
      });
    },
    Trim(str, is_global) {
      var result;
      result = str.replace(/(^\s+)|(\s+$)/g, "");
      if (is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
      }
      return result;
    },
    refresh() {
      if (!this.refreshJudge) {
        this.$refs.refresh.refresh();
        this.refreshJudge = true;
      }
    },
   

  },
  mounted() {
    
  },
  updated(){
    
    
  },
  activated (){
   
  },
  computed: {
    pages() {
      //拆分数组
      let pages = [];
      this.List.forEach((item, index) => {
        const page = Math.floor(index / 3);
        if (!pages[page]) {
          pages[page] = [];
        }
        pages[page].push(item);
      });
      return pages;
    }
  },
  created() {
    this._getrecommend();
    this._getrecommendContaine();

  }
};
</script>


<style lang="stylus" scoped >
@import '~stylus/variable.styl';

.recommend {
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  margin-top: 7rem;
  overflow: hidden;

  .slider {
    height: 0;
    overflow: hidden;
    padding-bottom: 40%;
    position: relative;
    &>>>
    &>>>.swiper-pagination-bullet {
      background-color: $color-text-lll;
    }

    &>>>.swiper-pagination-bullet-active {
      background-color: $color-them-icon;
    }

    .img-slide {
      width: 100%;
    }
  }

  .song-mean {
    margin: 1rem auto;
    text-align: center;
    line-height: 2.5rem;
    font-size: $font-size-m;
    letter-spacing: 0.25rem;
  }

  .load {
    margin: 0 autp;
    overflow: hidden;
    height: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .page {
    display: flex;
    width 90%
    margin 0 auto
    justify-content space-between

    .item-page {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;

      .page-imag {
        position: relative;
        width: 10rem;

        .icon {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          .singer-num{
            align-self flex-end
            }
          .icon-shuangsechangyongtubiao-{
              font-size 2rem
            }
        }
      }

      .item-des {
        margin: 0.5rem 0 1rem 0;
        width: 10rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        word-wrap: break-word;

        .yaowan {
            position absolute
          }

        .des {
          display: inline-block;
          text-indent: 1.5rem;
          line-height: 1.5rem;
        }
      }
    }
  }
}
</style>
