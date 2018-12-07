<template>

    <better-scroll class="in-land"  >
        <div>
            <div class="inland-box" v-for="item of list" :key="item.id">
                <div class="inland-imag-box">
                    <img @land="refresh" class="inland-imag" v-lazy="item.imag" alt>
                </div>
                <div class="inland-name" v-text="item.name"></div>
            </div>
        </div>
    </better-scroll>
 </template>

<script>
import { getSingerList } from "api/getSinger.js";
import { OK } from "js/config";
import BetterScroll from "../../common/scroll";
class Singer {
  constructor(id, name) {
    (this.id = id),
      (this.name = name),
      (this.imag = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`);
  }
}
export default {
        name:'InLand',
        data (){
            return {
                list:[]
            }
        },
        components:{
            BetterScroll
        },
        methods:{

        },
  methods: {
    //获取数据
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code == OK) {
          if (res.data.list) {
            this.list = this.handleList(res.data.list);
            this.list = this.list.Land.Singers
          }
        }
      });
    },
    //处理数据
    handleList(list) {
      var map = {
        Land: {
          title: '内地',
          Singers: []
        }
      };
      list.forEach((item, index) => {
        if (item.Farea == 0) {
            map.Land.Singers.push(
                 new Singer(item.Fsinger_mid, item.Fsinger_name)
             );
         }

        });
      return map;
    },
    refresh (){
      if (!this.Judge){
        this.$refs.refresh.refresh();
        this.Judge = true;
      }
    }
  },
  created() {
    this._getSingerList();
  }
}
</script>


<style lang="stylus" scoped >
@import '~stylus/variable.styl'
 .in-land
    position absolute
    top 12rem
    bottom 0
    left 0
    right 0
    overflow hidden 
    .inland-box
         display flex
         align-items center
         .inland-imag-box
             height 0
             padding-bottom: 7rem 
             margin: 1rem 0 1rem 1rem
             .inland-imag
                 width: 7rem
                 height 7rem
                 border-radius: 50%
        .inland-name
            flex-grow: 1
            padding-left: 2rem
            color: $color-text-d 

</style>
