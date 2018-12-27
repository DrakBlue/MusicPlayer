<template>
  <div class="search">
    <search-box @catchValue="catchValue" ref="searchBox" :PlaceHolder="PlaceHolder"></search-box>
    <search-request
      :upDataByScroll="upDataByScroll"
      ref="SearchRequst"
      @selectSinger="selectSinger"
      @catchMoreData="catchMoreReuqeset"
      @SelectSong="playSong"
      @SelectSearch="saveSearchKey"
      v-show="Question"
      :zhidaContainer="zhidaContainer"
      :songList="songList"
      :loadState="!catchEnd"
    ></search-request>
    <confirm ref="confirm" @handleSure="clearSearchHistory"></confirm>
    <better-scroll class="wrapper" ref="refresh" :data="refreshData"  >
      <div ref="hotkeyAndHistory">
        <hot-key v-show="!Question" :hotKey="hotKey" @SelectItem="SelectItem"></hot-key>
        <search-history
          ref="history"
          @selectRemoveItem="removeOneItem"
          @clear="showConfrim"
          @push="SelectItem"
          v-show="!Question"
          :searchs="search_history"
        ></search-history>
      </div>
    </better-scroll>
    <div class="no-request" v-show="noRequest">
      <no-result></no-result>
    </div>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
//js
import {mapMutations } from "vuex";
import { getHotKey} from "@/api/search";
import { OK } from "@/api/config";
//components
import SearchBox from "../common/search-box";
import HotKey from "../common/hot-key";
import Confirm from "../common/confirm";
import BetterScroll from "../common/scroll";
import SearchRequest from "../search-request/search-request";
import SearchHistory from "../search-history/search-history.vue";
import NoResult from '../no-result/no-result'

// mixin
import { playlistMixin, searchMixin } from "@/common/js/mixin";
class Singer {
  constructor(id, name) {
    (this.id = id),
      (this.name = name),
      (this.imag = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`);
  }
}
export default {
  mixins: [playlistMixin, searchMixin],
  components: {
    SearchBox,
    HotKey,
    SearchRequest,
    SearchHistory,
    Confirm,
    BetterScroll,
    NoResult
  },
  data() {
    return {
      PlaceHolder: "搜索歌曲、歌手",
      hotKey: [],
    };
  },
  computed: {
    refreshData() {
      return this.hotKey.concat(this.search_history);
    }
  },
  methods: {
    ...mapMutations({
      setSinger: "SET_SINGER"
    }),
    _getHotKey() {
      getHotKey().then(res => {
        if (res.code == OK) {
          this.hotKey = res.data.hotkey;
        }
      });
    },
    selectSinger() {
      let singer = new Singer(
        this.zhidaContainer.singermid,
        this.zhidaContainer.singername
      );
      this.$router.push({
        path: `/search/${singer.id}`
      });
      this.setSinger(singer);
    }
  },
  created() {
    this._getHotKey();
  }
};
</script>

<style lang="stylus" scoped>
@import '~stylus/variable';

.wrapper {
  position: absolute
  top 12rem
  left 0
  right 0
  bottom 0
  overflow hidden
}

.no-request {
  position: relative;
  margin: 0 auto;
  text-align: center;
  line-height: 3rem;
  color: $color-text-l;
  font-size: 1.5rem;
  letter-spacing: 0.1rem;
  margin-top: 30%;
}
</style>
