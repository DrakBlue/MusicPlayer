import {
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import {
  search
} from '@/api/search'
import {
  OK
} from '@/api/config'
import {
  createCDSong,
  isValidMusic,
  processSongsUrl
} from '@/common/js/song.js'
import Song from '@/common/js/song'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'play_list',
    ]),
  },
  mounted() {
    this.handlePlaylist(this.play_list)
  },
  activated() {
    this.handlePlaylist(this.play_list)
  },
  watch: {
    play_list(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}




export const PlayModeMixin = {
  computed: {
    ...mapGetters([
      'play_mode'
    ]),
    playMode() {
      return this.play_mode === 0 ? 'icon-shunxubofang' : this.play_mode === 1 ? 'icon-suijibofang' : 'icon-danquxunhuan3'
    },
  },
  watch: {

  },
  methods: {
    ...mapActions([
      'RadomPlay',
    ]),
    ...mapMutations({
      setPlayMode: 'SET_PLAY_MODE'
    }),
    changePlayMode() {
      let playMode = this.play_mode
      playMode = (playMode + 1) % 3
      this.RadomPlay(playMode)
      this.setPlayMode(playMode)
      
    },
  }
}

export const searchMixin = {
  data() {
    return {
      zhidaContainer: {},
      songList: [],
      catchEnd: false,
      upDataByScroll: true,
      Question: null,
      noRequest: false,
      page: 0,
      zhida: 1,
      perpage: 30

    }
  },
  computed: {
    ...mapGetters([
      'screen_size',
      'search_history'
    ])
  },
  methods: {
    ...mapActions([
      'insertSong',
      'saveSearchHistory',
      'removeSearchItem',
      'ClearAllSearch'
    ]),
    handlePlaylist(playlist) {
      const Bottom = playlist.length > 0 ? '70px' : ''
      this.$refs.refresh.$el.style.bottom = Bottom
      this.$refs.refresh.refresh()
      this.$refs.hotkeyAndHistory.style.bootom = Bottom
    },
    removeOneItem(target) {
      this.removeSearchItem(target)
    },
    showConfrim() {
      this.$refs.confirm.show()
    },
    clearSearchHistory() {
      this.ClearAllSearch()
    },
    SelectItem(item) {
      this.Question = item
      this.$refs.searchBox.pushHotKey(item)
    },

    catchMoreReuqeset() {
      if (this.catchEnd) {
        return
      }
      search(this.Question, this.page++, this.zhida, this.perpage).then(res => {
        if (res.code == OK) {
          let data = res.data
          if (data.zhida && data.zhida.singername) {
            this.zhidaContainer = { ...data.zhida
            }
            this.zhidaContainer.state = true
          } else {
            this.zhidaContainer.state = false
          }
          processSongsUrl(this._normalizeSongs(data.song.list)).then((songs) => {
            this.songList = this.songList.concat(songs)
          })
          this.checkRequestNum(data)
        }
      })
    },
    playSong(item) {
      let song = item
      if (!this.screen_size) {
        this.insertSong({
          song,
          screenSize: false
        })
      } else {
        this.insertSong({
          song,
          screenSize: true
        })
      }

    },
    saveSearchKey() {
      this.saveSearchHistory(this.Question)
    },
    checkRequestNum(data) {
      const song = data.song
      if (!song.list.length || (song.curnum + (song.curpage - 1) * this.perpage) > song.totalnum) {
        this.catchEnd = true
      }
    },
    _catchReuqeset() {
      this.page = 1
      this.noRequest = false
      this.catchEnd = false
      this.$refs.SearchRequst.scroll()
      search(this.Question, this.page, this.zhida, this.perpage).then(res => {
        if (res.code == OK) {
          let data = res.data
          if (data.zhida && data.zhida.singername) {
            this.zhidaContainer = { ...data.zhida
            }
            this.zhidaContainer.state = true
          } else {
            this.zhidaContainer.state = false
          }
          if (data.song.list.length == 0 && !this.zhidaContainer.state && this.Question) {
            this.noRequest = true
          }
          processSongsUrl(this._normalizeSongs(data.song.list)).then((songs) => {
            this.songList = songs

          })
          this.checkRequestNum(data)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (isValidMusic(musicData)) {
          ret.push(createCDSong(musicData))
        }
      })
      return ret
    },
    catchValue(Value) {
      this.Question = Value
      this._catchReuqeset()
    },
  },
  created() {
    this.$watch('Question', () => {
      this._catchReuqeset()
    })
  }
}


export const CollectSongMixin  = {
    data (){
      return {
        favList:[]
      }
    },
    computed:{
      ...mapGetters([
        'collectSong',
        'play_list'
      ])
    },
    watch:{
      collectSong (){
        this._searchCollectSong()
      }
    },
    methods:{
      ...mapActions([
        'SaveCollectSong',
      ]),
      _saveCollectSong (song){
        if(!song){
          return
        }
        song = new Song(song)
        this.SaveCollectSong(song)
        this._searchCollectSong()
      },
      _searchCollectSong (){

        let num = []
        
        let collectList = this.collectSong
        
        let playList = this.play_list
        collectList.forEach((target)=>{
          
          let i = playList.findIndex((item)=>{
              return item.id==target.id

          })
          if(i>-1){
            num.push(i)
          }

        })
        num.sort()
        let ret = []
        if(num.length){
          for(let i=0;i<num.length;i++){
            let a = num[i]
            ret.push(playList[a])
          }
        }
        this.favList = ret
      },
      changeColor(song){
        let flag = this.favList.findIndex((item)=>{
          return item.id == song.id
        })
        if(flag>-1){
          return true
        }else{
          return false
        }
      }
    },
    activated (){
      this._searchCollectSong()
    },
    mounted (){
      this._searchCollectSong()
    }
    
}