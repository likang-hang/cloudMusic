<template>
  <div class="container">
    <div class="jingpin-song-list">
      <img src="" alt="">
      <div class="tags">
      </div>
    </div>
    <div class="songlistsorts">
      <div class="selectbox clearfix">
        <div class="select-btn">
          <button @click="getAllSortTags">{{sortName}}<i class="iconfont iconright"></i></button>
        </div>
        <div class="select-hot-btn">
          <ul>
            <li v-for="item in hotSongListSorts" :key="item.position">{{item.name}}</li>
          </ul>
        </div>
        <div class="all-select-btn" :style="sortTagVisible">
          <div class="all"><button>全部歌单</button></div>
          <div class="sortmethod" v-for="(item, i) in sortmethod" :key="i">
            <span class="iconfont select_method">{{item}}</span>
            <div class="every-method-box">
            <span v-for="(item1, i1) in songListSorts" :key="i1">
              <a href="javascript:;" v-if="Number(i)===item1.category" class="evesort" @click.prevent="getCatSongList(item1.name)">{{item1.name}}</a>
            </span>
          </div>
          </div>
        </div>
      </div>
      <div class="song-list clearfix">
        <ul>
          <li v-for="(item2, i2) in songLists" :key="i2">
            <div class="song-img-box">
              <a href="javascript:;">
                <img :src="item2.coverImgUrl" alt="">
                <i class="iconfont icongerenshezhi">{{item2.creator.nickname}}</i>
              </a>
            </div>
            <p class="songlist-title">{{item2.name}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="songlists-page">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        coverimg: '',
        // 全部歌单
        songLists: [],
        // 歌单分类
        songListSorts: [],
        sortName: '',
        sortmethod: [],
        hotSongListSorts: [],
        sortTagVisible: {
          display: 'none'
        }
      }
    },
    created() {
      this.getSongListSorts()
      this.getSongLists()
      this.getHotSongListSorts()
    },
    methods: {
      // 全部歌单
      async getSongLists(cat = '全部') {
        const { data: res } = await this.$http.get(`/top/playlist?limit=50&cat=${cat}`)
        // console.log(res)
        this.songLists = res.playlists
      },
      // 所有歌单分类
      async getSongListSorts() {
        const { data: res } = await this.$http.get('/playlist/catlist')
        console.log(res)
        this.songListSorts = res.sub
        this.sortName = res.all.name
        this.sortmethod = res.categories
      },
      async getHotSongListSorts() {
        const { data: res } = await this.$http.get('/playlist/hot')
        // console.log(res)
        this.hotSongListSorts = res.tags
      },
      getAllSortTags() {
        if(this.sortTagVisible.display === 'none') {
          this.sortTagVisible.display = 'block'
        } else {
          this.sortTagVisible.display = 'none'
        }
      },
      getCatSongList(cat) {
        this.getSongLists(cat)
        this.sortTagVisible.display = 'none'
      },
      handleCurrentChange() {
      }
    }
  }
</script>

<style scoped>
.container {
  width: 1000px;
  margin-left: 130px;
}
.jingpin-song-list {
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 230px;
  background: #5f593f;
  border-radius: 10px;
}
.jingpin-song-list img {
  height: 200px;
  width: 200px;
}
.songlistsorts {
  line-height: 50px;
  width: 100%;
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
}
.selectbox {
  position: relative;
}
.songlistsorts .select-btn {
  float: left;
}
.songlistsorts .select-btn button {
  height: 30px;
  border-radius: 15px;
  font-size: 14px;
  padding: 0 10px;
}
.songlistsorts .select-btn button:hover {
  background: #3b3b3d2c;
}
.select-hot-btn  {
  float: right;
}
.select-hot-btn ul li {
  float: left;
  margin-left: 25px;
  font-size: 12px;
  color: rgb(97, 93, 93);
}
.select-hot-btn ul li:hover {
  color: #000;
  cursor: default;
}
.all-select-btn {
  position: absolute;
  top: 50px;
  width: 720px;
  box-shadow: 1px 1px 5px #888888;
  background: #fff;
  z-index: 3;
}
.all-select-btn .all {
  width: 100%;
  cursor: pointer;
  border-bottom: 1px solid #cfcfcf;
}
.all-select-btn .all button {
  height: 26px;
  border-radius: 13px;
  font-size: 12px;
  padding: 0 8px;
  color: rgb(224, 95, 95);
  margin-left: 20px;
}
.all-select-btn .sortmethod {
  margin: 20px 0;
}
.all-select-btn .sortmethod .select_method {
  margin: 10px 60px 0 10px;
  color: #cfcfcf;
}
.all-select-btn .sortmethod .every-method-box {
  display: inline-block;
  width: 600px;
  vertical-align: top;
}
.all-select-btn .sortmethod span a {
  font-size: 14px;
  display: inline-block;
  width: 100px;
}
.all-select-btn .sortmethod span a:hover {
  color: red;
}
.song-list {
  margin-bottom: 30px;
}
.song-list li {
  position: relative;
  float: left;
  width: 188px;
  height: 220px;
  margin: 5px 12px 50px 0;
  line-height: normal;
}
.song-list li .song-img-box {
  width: 188px;
  height: 188px;
  /* border-radius: 30px; */
}
.song-list li:nth-child(5) {
  margin-right: 0;
}
.song-list li img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.song-list li i {
  position: absolute;
  bottom: 40px;
  left: 8px;
  font-size: 12px;
  color: #fff;
}
.song-list li p {
  font-size: 14px;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.songlists-page {
  text-align: center;
  margin-bottom: 80px;
}
</style>
