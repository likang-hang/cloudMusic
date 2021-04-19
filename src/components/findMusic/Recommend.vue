<template>
  <div class="container">
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="250px">
        <el-carousel-item v-for="(item, i) in carousel" :key="i">
          <a :href="item.httpurl">
            <img :src="item.imgurl" alt="">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="rs clearfix">
      <div class="title"><span>推荐歌单</span><i class="iconfont iconright"></i></div>
      <ul>
        <li>
          <div class="list-img-box">
            <span>{{todayDate}}</span>
            <div class="iconbox"><i class="iconfont iconyinyue"></i></div>
          </div>
          <p><a href="javascript:;">每日歌曲推荐</a></p>
        </li>
        <li v-for="(item, i) in recommendSongList" :key="i">
          <div class="list-img-box">
            <a href="javascript:;"><img :src="item.picUrl" alt=""></a>
            <div class="iconbox"><i class="iconfont iconyinyue"></i></div>
          </div>
          <p><a href="javascript:;">{{item.name}}</a></p>
        </li>
      </ul>
    </div>
    <div class="unique-song clearfix">
      <div class="title"><span>独家放送</span><i class="iconfont iconright"></i></div>
      <ul>
        <li v-for="(item, i) in uniqueSong" :key="i">
          <div class="unique-img-box">
            <a href="javascript:;"><img :src="item.picUrl" alt=""></a>
            <i class="iconfont iconbofang1"></i>
          </div>
          <p><a href="javascript:;">{{item.copywriter}}</a></p>
        </li>
      </ul>
    </div>
    <div class="new-song clearfix">
      <div class="title"><span>最新音乐</span><i class="iconfont iconright"></i></div>
      <ul>
        <li v-for="(item, i) in newSong" :key="i">
          <div class="new-img-box">
            <a href="javascript:;"><img :src="item.album.blurPicUrl" alt=""></a>
            <i class="iconfont iconbofang1"></i>
          </div>
          <div>
            <p>{{item.name}}</p>
            <p class="articler">{{item.album.artists[0].name}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="recom-mv clearfix">
      <div class="title"><span>推荐MV</span><i class="iconfont iconright"></i></div>
      <ul>
        <li v-for="(item, i) in recomMv" :key="i">
          <div class="mv-img-box">
            <a href="javascript:;"><img :src="item.picUrl" alt=""></a>
          </div>
          <div>
            <p>{{item.name}}</p>
            <p class="artist">{{item.artistName}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 轮播图数据
        carousel: [
          { imgurl: 'https://p1.music.126.net/_egzZcw8JK_k1miX2hZiCw==/109951165896712220.jpg?imageView&quality=89',
            httpurl: 'https://music.163.com/store/newalbum/detail?id=123858074'
          },
          { imgurl: 'https://p1.music.126.net/C4vB-0uGRDUbxEPcpL9uFg==/109951165896716360.jpg?imageView&quality=89',
            httpurl: 'https://music.163.com/#/song?id=1837072264'
          },
          { imgurl: 'https://p1.music.126.net/o2lVIXPsb_CZrDYDgh6B4Q==/109951165896650070.jpg?imageView&quality=89',
            httpurl: 'https://music.163.com/#/album?id=126080216'
          },
          { imgurl: 'http://p1.music.126.net/FNJNQlpyCShZCnHbqrglWw==/109951165896653590.jpg?imageView&quality=89',
            httpurl: 'https://music.163.com/#/song?id=1835950126'
          },
          { imgurl: 'http://p1.music.126.net/C3cYA3VDCs936NCFLf3ylQ==/109951165896522436.jpg?imageView&quality=89',
            httpurl: 'https://music.163.com/#/song?id=1837479636'
          },
          { imgurl: 'http://p1.music.126.net/KOQhRfzpq1E_ZGvsDeUrCA==/109951165896610546.jpg?imageView&quality=89',
            httpurl: 'https://music.163.com/#/song?id=1835294886'
          }
        ],
        // 每天歌单
        recommendListDay: [],
          // 推荐歌单
        recommendSongList: [],
        // 独家放送
        uniqueSong: [],
        // 最新音乐
        newSong: [],
        // 推荐MV
        recomMv: [],
        todayDate: (new Date()).getDate()
      }
    },
    created() {
      this.getSongListDay()
      this.getRecommendSongList()
      this.getUniqueSong()
      this.getNewSong()
      this.getRecommendMv()
    },
    methods: {
      // 每日推荐音乐
      async getSongListDay() {
        const { data: res } = await this.$http.get('/recommend/songs')
        // console.log(res)
        this.recommendListDay = res
      },
      // 推荐歌单
      async getRecommendSongList() {
        const { data: res } = await this.$http.get('/personalized?limit=9')
        // console.log(res)
        this.recommendSongList = res.result
      },
      async getUniqueSong() {
        const { data: res } = await this.$http.get('/personalized/privatecontent/list?limit=2')
        // console.log(res)
        this.uniqueSong = res.result
      },
      async getNewSong() {
        const { data: res } = await this.$http.get('/top/song')
        const result = res.data.slice(0, 12)
        // console.log(result)
        this.newSong = result
      },
      async getRecommendMv() {
        const { data: res } = await this.$http.get('/personalized/mv')
        console.log(res)
        this.recomMv = res.result
      }
    }
  }
</script>

<style scoped>
.container {
  width: 1000px;
  margin-left: 130px;
}
.container .title {
  color: rgb(51, 48, 48);
  font-weight: 700;
  font-size: 20px;
  margin: 30px 0 10px 0;
  cursor: pointer;
}
.container .title:hover {
  color: #000;
}
.carousel img {
  width: 100%;
  height: 100%;
}
.clearfix::before, .clearfix::after {
  content: "";
  display: table;
}
.clearfix::after{
  clear: both;
}
.rs li {
  float: left;
  width: 140px;
  height: 180px;
  margin-right: 75px;
  margin-bottom: 26px;
}
.rs li p {
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
  overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;

}
.rs li:nth-child(5n) {
  margin-right: 0;
}
.rs li .list-img-box {
  height: 140px;
  position: relative;
  border: 0.5px solid #b9aea1;
}
.rs li .list-img-box:nth-child(1) {
  text-align: center;
  line-height: 140px;
  height: 140px;
  font-size: 30px;
  background: rgba(82, 48, 48, 0.342);
}
li img {
  width: 100%;
  height: 100%;
}
.rs li p {
  font-size: 14px;
  margin: 8px 0;
}
.rs li .iconbox i {
  position: absolute;
  bottom: 7px;
  right: 10px;
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: #fff;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.rs li .iconbox i::before {
  color: red;
}
.unique-song li {
  position: relative;
  float: left;
  margin-right: 80px;
  width: 460px;
  height: 310px;
}
.unique-song li:nth-child(2) {
  margin-right: 0;
}
.unique-song li .unique-img-box {
  height: 250px;
}
.unique-song .unique-img-box i {
  position: absolute;
  top: 10px;
  left: 10px;
  color: #fff;
  font-size: 25px;
  cursor: pointer;
}
.unique-song p {
  font-size: 14px;
}
.new-song li {
  float: left;
  width: 320px;
  height: 60px;
  margin: 0 16px 20px 0;
}
.new-song .new-img-box {
  position: relative;
  float: left;
  width: 60px;
  height: 60px;
}
.new-song li:nth-child(3n) {
  margin-right: 0;
}
.new-song .new-img-box i {
  position: absolute;
  top: 15px;
  left: 15px;
  font-size: 28px;
  color: #fff;
}
.new-song .new-img-box i::before {
  cursor: pointer;
}
.new-song p {
  font-size: 14px;
  margin: 3px 0 10px 65px;
}
.new-song .articler {
  font-size: 12px;
  color: #9f9fcf;
  cursor: pointer;
}
.new-song .articler:hover {
  color: rgb(65, 56, 56);
}
.recom-mv li {
  position: relative;
  float: left;
  width: 239px;
  height: 200px;
  margin-right: 14px;
}
.recom-mv li:nth-child(4) {
  margin-right: 0;
}
.recom-mv li p {
  cursor: pointer;
  color: #3b3a3a;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}
.recom-mv li .artist {
  font-size: 12px;
  color: rgb(116, 115, 115);
}
.recom-mv li .artist:hover {
  color: rgb(65, 63, 63);
}
.recom-mv li p:hover {
  color: #000;
}
</style>
