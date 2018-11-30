<template>
  <div>
    <div class="line" ref="Line"></div>
    <div class="recommend" ref="wrapper">
      <div>
        <div class="slider">
          <swiper :options="swiperOption" class="slider-package">
            <swiper-slide v-for="item in slider" :key="item.id" class="slide-item">
              <img :src="item.picUrl" alt class="img-slide">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="song-mean">热门歌单</div>

        <div class="items">
          <div v-for="item in List" class="item-box" :key="item.dissid">
            <div class="icon">
              <i class="iconfont icon-icon-test">
                <span class="test-num">{{(item.listennum/10000).toFixed(1)}}万</span>
              </i>
              <i class="iconfont icon-shuangsechangyongtubiao-"></i>
            </div>
            <img :src="item.imgurl" alt class="item-imag">
            <div class="song-message">
              <i class="iconfont icon-yaowan1"></i>
              <div>{{item.dissname}}</div>
            </div>
          </div>
          <div class="get-more">
            ...获取更多
            <i class="iconfont icon-jiantouzuo"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRcommendSlide } from "api/getRecommendSlide";
import {  getDiscList } from "api/getRecommendContainer.js";
import { OK } from "js/config";
import BScroll from "better-scroll";
import axios from 'axios'
export default {
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
        autoplayDisableOnInteraction:false
      },
      slider: null,
      songList: null,
      List:[]
    };
  },
  components: {},
  methods: {
    _getrecommend() {
      getRcommendSlide().then(res => {
        // console.log(res);
        if (res.code == OK) {
          this.slider = res.data.slider;
          this.songList = res.data.songList;
        }
      });
    },
    _getrecommendContaine() {
       getDiscList().then(res=>{
         console.log(res)
         if(res.code==OK){
           this.List = res.data.list
         }
       })
    },
    scrollFun() {
        let line = -this.scroll.y;
        if(this.scroll.y>=0){
            line=0
            this.$refs.Line.style.width = line + "px";
        }
        this.$refs.Line.style.width = line/10 + "px";
        }
      
  },
  mounted() {
    if (!this.scroll) {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3
      });
    }

    if (this.scroll) {
      this.scroll.on("scroll", this.scrollFun);
      this.scroll.on('flick',this.scrollFun)
    }
  },
  created() {
    this._getrecommend()
    this._getrecommendContaine()
  }
};
</script>


<style lang="stylus" scoped >
@import '~stylus/variable.styl';

.line {
  width: 0rem;
  margin-top: 1rem;
  border-bottom: 0.1rem solid $color-them-icon;
  color: $color-text-lll;
}

.recommend {
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  margin-top: 10rem;
  overflow: hidden;

  .slider {
    height: 0;
    overflow: hidden;
    padding-bottom: 40%;
    position: relative;

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

  .items {
    margin-bottom: 2rem;
    margin-top: 1.5rem;
    padding: 0 1rem;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    .item-box {
      padding: 0.5rem 0.5rem 6rem 0.5rem;
      width: 40%;
      display: inline;
      position: relative;
      background-color: $color-text-l;
      margin-bottom: 2rem;
      border-radius: 0.3rem;
      box-shadow: 0.1rem 0.1rem 0.3rem #eee;

      .icon {
        position: absolute;
        margin-top: 100%;
        width: 90%;
        top: -3rem;
        display: flex;
        justify-content: space-between;

        .iconfont {
          display: block;

          .test-num {
            font-size: $font-size-xs;
          }
        }
      }

      .item-imag {
        width: 100%;
      }
    }

    .song-message {
      padding: 0.2rem 0rem;
      text-indent: 0.5rem;
      line-height: 1.7rem;
      position: absolute;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1; /* * 多行文本溢出... */
      font-size: $font-size-s;
      margin-top: 90%;
      top: 1.5rem;
      overflow: hidden;

      .icon-yaowan1 {
        text-indent: -0.5rem;
        color: $color-them-icon;
      }
    }

    .get-more {
      color: $color-text-lll;
      line-height: 2rem;
      font-size: $font-size-s;
      margin: 0 auto;

      .icon-jiantouzuo {
        display: inline;
        font-size: $font-size-xl;
        vertical-align: middle;
        color: $color-them-icon;
      }
    }
  }
}
</style>
