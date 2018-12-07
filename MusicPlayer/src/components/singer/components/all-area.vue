<template>
<div ref="refreshchild">
    <better-scroll ref="refresh" tag="div" class="ref" :scrollFlag="scrollFlag" @onscroll="onscroll" @onscrollend="onscrollend" :probeType="probeType">
      <div>
        <div class="hot" ref="hotbox">
          <div class="title" ref="hot" >热门</div>
          <div class="hot-box" v-for="item of hot" ref="hotitem" :key="item.id">
            <div class="hot-imag-box">
              <img class="hot-imag" v-lazy="item.imag" alt>
            </div>
            <div class="hot-name" v-text="item.name"></div>
          </div>
        </div>

        <div class="all">
          <div class="box-item" v-for="(item,index) of All" :key="index" ref="keyitem">
            <div class="item-key" v-text="item.title" ref="singers"></div>
            <div v-for="singer in item.Singers"  class="item-box" :key="singer.id" >
              <div class="imag-box">
                <img @load="refresh" v-lazy="singer.imag" alt class="imag">
              </div>
              <div class="name-box" v-text="singer.name"  ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="fix-title" ref="fixed" :index="keyindex" v-show="fixedtitle.show">{{fixedtitle.name}}</div>
    </better-scroll>
    <ul class="keylist" ref="keylisturl" @click="checkoutKey($event)" @touchstart="ontouchstart" @touchmove.prevent.stop="ontouchmove">
      <li :class="{'key':true,'Changecolor':i==index}" ref="keylist" v-for="(item,index) in keylist" :key="index" :indexPoint="index">{{item[0]}}</li>
    </ul>
    
</div>
</template>

<script>
import { getSingerList } from "api/getSinger.js";
import { OK } from "js/config";
import BetterScroll from "../../common/scroll";


const HOT_Singer = "热门";
const HOT_LENGTH = 11;
const Land = "内地";
const IsLand = "港台";
const E_A = "欧美";
const BNANG_ZI = "日韩";


class Singer {
  constructor(id, name) {
    (this.id = id),
      (this.name = name),
      (this.imag = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`);
  }
}

export default {
  name: "AllArea",
  props: {},
  data() {
    return {
      probeType:3,
      list: {},
      Type: true,
      hot: [],
      All: {},
      keylist:[],
      touchStatus:false,
      stratY:null,
      keyindex:null,
      index:0,
      fixedtitle:{name:"热门",show:true},
      i:0
     

    };
  },
  components: {
    BetterScroll
  },
  watch:{
   
  },
  computed: {
    itemheight (){
     let height = []
     let hotheight = this.$refs.hotbox.offsetHeight
     height.push(hotheight)
     for( let i in this.$refs.keyitem ){
       let boxheight = this.$refs.keyitem[i].offsetHeight
       height.push(boxheight)
     }
     return [...height ]
    },
    scrollHeight (){
      if(this.itemheight){
        let Height = 0
        let scrollHeight = [] 
       for(let i = 0;i<this.itemheight.length;i++){
          Height += this.itemheight[i]
           scrollHeight.push(Height)
        }
        return scrollHeight  
      }
    }

  },
  methods: {
    checkoutKey (event){
        let index = event.target.getAttribute("indexPoint")
        this.__scroll(this.$refs.singers,this.$refs.hot,index)
        this._changecolor(this.$refs.keylist,index,"#fcd703")
    },
    _changecolor (e,index,co){
      for (let i in e ){
        if(!e.target){
          e[i].style.color= "#fff"
        }
      }
      if(index>=0&&!e.target&&index!=null){
        e[index].style.color=co
      }
      
    },
    __scroll (el1,el2,index){
     if(index==0){
         this.$refs.refresh.scrollToElement (el2,0)
     }else if(index>=1&&index<=this.$refs.keylist.length){
       this.$refs.refresh.scrollToElement (el1[index-1],0)
     }
    },
    _scroll (el1,el2,index){
        this.keyindex = this.keylist[index]
        if(index>=0){
            if(index>=1){
            this.$refs.refresh.scrollToElement (el1[index],0)
          }else if(index==0){
            this.$refs.refresh.scrollToElement (el2,0)
          }
        }
    },
    ontouchstart (){
      this.touchStatus = true
    },
    ontouchmove (e){
      if(this.touchStatus){
        let MoveY = e.touches[0].clientY
        let MoveLen = MoveY - this.stratY
        if(MoveLen>=0){
          let index = (MoveLen/18.4 | 0)-1
          if(this.$refs.keylist.length>=index>=0){
            this._scroll(this.$refs.singers,this.$refs.hot,index-1)
            this._changecolor(this.$refs.keylist,index,"#fcd703")
          }
         
        }
      }
    },
    onscroll (pos){
      let y = -pos.y
      let scrollHeight = [-1,...this.scrollHeight]
      if(y<=0){
        this.fixedtitle.show=false
        this._changecolor(this.$refs.keylist,0,"#fcd703")
      }else{
        this.fixedtitle.show=true
      }
      for(let i=1;i<scrollHeight.length;i++){
        let height1 = scrollHeight[i]
        let height2 = scrollHeight[i+1]
        if(y<scrollHeight[1]){
          this.fixedtitle.name=this.keylist[0]
        }
        if(y>=height1&&y<=height2){
          this._changecolor(this.$refs.keylist,i,"#fcd703")
          this.fixedtitle.name=this.keylist[i]
        }
        if(y>=scrollHeight[i]-30){
          let fixedTop = y-scrollHeight[i]+30
          if(fixedTop<=30){
            fixedTop=fixedTop
          }else{
            fixedTop=0
          }
          this.$refs.fixed.style.transform = `translate3d(0,${-fixedTop}px,0)`
          
          
        }
      }
    },
    onscrollend (pos){

    },
    //获取数据
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code == OK) {
          if (res.data.list) {
            this.list = this.handleList(res.data.list);
            this.hot = this.list.hot.Singers.slice(1);
            this.All = this.sortArr(this.list.All);
          }
        }
      });
    },
    // 排序
    sortArr(obj) {
      let newObj = {};
      let keyArr = Object.keys(obj);
      let all = [];
      keyArr.sort(function(a, b) {
        return a.charCodeAt(0) - b.charCodeAt(0);
      });
      for (let i = 1; i < keyArr.length; i++) {
        if (keyArr[i].match(/[a-zA-Z]/)) {
          let key = keyArr[i];
          all.push(obj[key]);
        }
      }
      return all;
    },
    //处理数据
    handleList(list) {
      var map = {
        hot: {
          title: HOT_Singer,
          Singers: []
        },
        Land: {
          title: Land,
          Singers: []
        },
        Island: {
          title: IsLand,
          Singers: []
        },
        Ea: {
          title: E_A,
          Singers: []
        },
        Bangzi: {
          title: BNANG_ZI,
          Singers: []
        },
        All: {}
      };
      list.forEach((item, index) => {
        if (index < HOT_LENGTH) {
          map.hot.Singers.push(new Singer(item.Fsinger_mid, item.Fsinger_name));
        }
        if (item.Farea == 1) {
          map.Land.Singers.push(
            new Singer(item.Fsinger_mid, item.Fsinger_name)
          );
        } else if (item.Farea == 0) {
          map.Island.Singers.push(
            new Singer(item.Fsinger_mid, item.Fsinger_name)
          );
        } else if (item.Farea == 2) {
          map.Bangzi.Singers.push(
            new Singer(item.Fsinger_mid, item.Fsinger_name)
          );
        } else {
          map.Ea.Singers.push(new Singer(item.Fsinger_mid, item.Fsinger_name));
        }
        let k = item.Findex;
       
        if (!map.All[k]) {
          this.keylist.push(k)
          map.All[k] = {
            title: k,
            Singers: []
          };
        }
        map.All[k].Singers.push(
          new Singer(item.Fsinger_mid, item.Fsinger_name)
        );
      });
      this.keylist.sort()
      this.keylist.splice(0,1,'热门')
      return map;
    },
    refresh (){
      if (!this.Judge){
        this.$refs.refresh.refresh();
        this.Judge = true;
      }
    }
  },
  updated (){
    this.stratY = this.$refs.keylisturl.offsetTop
    
  },
  beforeUpdata (){
  },
  created() {
    this._getSingerList();
    this.scrollFlag = true
    
  },
  activated (){
    
  }
};
</script>


<style lang="stylus" scoped >
@import '../css/singer.styl';
</style>
