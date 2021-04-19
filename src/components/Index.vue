<template>
  <div class="container">
    <div class="header">
      <div class="header-left">
        <div class="logo"><a href="#"><img src="../assets/log.png" alt=""></a></div>
        <div class="navigate">
          <a>&lt;</a>
          <a>&gt;</a>
        </div>
        <div class="search">
          <input type="text" placeholder="搜索">
          <button class="el-icon-search"></button>
        </div>
      </div>
      <div class="header-right">
        <div class="user">
          <el-avatar size="small" :src="avatarurl"></el-avatar>
          <a href="javascript:;" @click="userInfoVisible">
          <span>{{nickName}}</span>
          <i class="iconfont iconxiala"></i>
        </a>
        </div>
        <div class="config-box">
          <ul>
            <li><button class="iconfont iconxinfeng"></button></li>
            <li><button class="iconfont iconhuanfu"></button></li>
            <li><button class="iconfont iconshezhi"></button></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="aside">
      <div class="first">
        <ul @click="uniqueStyle">
          <li class="current"><router-link to="/find">发现音乐</router-link></li>
          <li><router-link to="/find">视频</router-link></li>
          <li><router-link to="/find">朋友</router-link></li>
          <li><router-link to="/find">直播</router-link></li>
          <li><router-link to="/find">私人FM</router-link></li>
        </ul>
      </div>
      <div class="second">
        <div class="title">
          <span>我的音乐</span>
        </div>
        <ul>
          <li><i class="iconfont iconyinyue"></i><span>本地音乐</span></li>
          <li><i class="iconfont iconxiazai"></i><span>下载管理</span></li>
          <li><i class="iconfont iconyun"></i><span>我的音乐云盘</span></li>
          <li><i class="iconfont icondiantai"></i><span>我的电台</span></li>
          <li><i class="iconfont iconshoucang"></i><span>我的收藏</span></li>
        </ul>
      </div>
      <div class="third">
        <div class="title">
          <a href="javascript:;" @click="creatSongListFun">
            <span>创建的歌单</span>
            <i class="iconfont iconxiala" v-if="creatIconChange"></i>
            <i class="iconfont iconright" v-else></i>
          </a>
        </div>
        <div class="creatsong-box" :style="creatSongVisibile">
        <ul>
          <li v-for="(item, i) in creatSongList" :key="i">
            <i class="iconfont iconlike" v-if="i===0"></i>
            <i class="iconfont iconyinleliebiao" v-else></i>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      </div>
      <div class="fort">
        <div class="title">
          <a href="javascript:;" @click="starSongListFun">
            <span>收藏的歌单</span>
            <i class="iconfont iconxiala" v-if="starIconChange"></i>
            <i class="iconfont iconright" v-else></i>
          </a>
        </div>
        <div class="starlist" :style="starSongVisibile">
        <ul>
          <li v-for="(item, i) in starSongList" :key="i">
            <i class="iconfont iconyinleliebiao"></i>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="selectMenu" :style="userVisible">
      <ul>
        <li><a href="javascript:;"><span class="iconfont iconhuaban26">会员中心</span><i class="iconfont iconright"></i></a></li>
        <li><a href="https://music.163.com/#/user/level"><span class="iconfont icondengji">等级</span><i class="iconfont iconright"></i></a></li>
        <li><a href="https://music.163.com/store/product"><span class="iconfont iconicon_mall-">商城</span><i class="iconfont iconright"></i></a></li>
        <li><a href="javascript:;"><span class="iconfont icongerenshezhi">个人信息设置</span><i class="iconfont iconright"></i></a></li>
        <li><a href="javascript:;"><span class="iconfont iconbangding">绑定社交账号</span><i class="iconfont iconright"></i></a></li>
        <li  @click="logout"><a href="javascript:;"><span class="iconfont icondianyuan">退出登录</span></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchContent: '',
        avatarurl: 'https://p4.music.126.net/CA4UGM2M0K3zlpKYdRNtKQ==/18526770930087657.jpg',
        nickName: '',
        userInfo: {},
        userVisible: {
          display: 'none'
        },
        creatSongList: [],
        starSongList: [],
        creatIconChange: true,
        starIconChange: true,
        creatSongVisibile: {
          display: 'block'
        },
        starSongVisibile: {
          display: 'block'
        }
      }
    },
    created() {
      this.getUserInfo()
      this.getUserSongList()
    },
    methods: {
      async getUserInfo() {
        const { data: res } = await this.$http.get(`/user/detail?uid=${localStorage.userId}`)
        // console.log(res)
        // console.log(res.profile.nickName)
        this.nickName = res.profile.nickname
        this.userInfo = res
      },
      // 用户信息界面的显示与隐藏
      userInfoVisible() {
        if(this.userVisible.display === 'none') {
          this.userVisible.display = 'block'
        } else {
          this.userVisible.display = 'none'
        }
      },
      // 退出
      async logout() {
        const { data: res } = await this.$http.get('/logout')
        this.$router.push('/login')
      },
      // 获取歌单列表
      async getUserSongList() {
        const { data: res } = await this.$http.get(`/user/playlist?uid=${localStorage.userId}`)
        // console.log(res)
        // console.log(localStorage.userId)
        res.playlist.forEach(item => {
          if(item.userId === Number(localStorage.userId)) {
            this.creatSongList.push(item)
          } else {
            this.starSongList.push(item)
          }
        })
      },
      creatSongListFun() {
        this.creatIconChange = !this.creatIconChange
        if(this.creatSongVisibile.display === 'block') {
          this.creatSongVisibile.display = 'none'
        } else {
          this.creatSongVisibile.display = 'block'
        }
      },
      starSongListFun() {
        this.starIconChange = !this.starIconChange
        if(this.starSongVisibile.display === 'block') {
          this.starSongVisibile.display = 'none'
        } else {
          this.starSongVisibile.display = 'block'
        }
      },
      uniqueStyle(e) {
        const a = e.currentTarget.children
        a.forEach(item => {
          item.classList.remove('current')
        })
        // console.log(a)
        e.target.classList.add('current')
      }
    }
  }
</script>

<style scoped>
  .container::before, .container::after {
    content: "";
    display: table;
  }
  .container::after {
    clear: both;
  }
  .header {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 65px;
    background-color: #ec4141;
  }
  .header-left, .header-right {
    width: 50%;
  }
  .header .logo {
    width: 200px;
    height: 100%;
    margin: 0
  }
  .header .logo img {
    width: 100%;
    height: 100%;
  }
  .navigate {
    position: absolute;
    display: flex;
    align-items: center;
    text-align: center;
    top: 0;
    left: 250px;
    width: 70px;
    height: 65px;
  }
  .navigate a {
    display: inline-block;
    background-color: #d93b3b;
    color: #f2baba;
    font-size: 16px;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    cursor: pointer;
    margin: 0 4px;
  }
  .search {
    color: #fff;
    position: absolute;
    left: 330px;
    top: 0;
    display: flex;
    align-items: center;
    height: 65px;
    width: 260px;
  }
  .search button {
    height: 24px;
    width: 42px;
    cursor: pointer;
    position: absolute;
    background: none;
    right: 130px;
    top: 20px
  }
  .search input {
    font-size: 12px;
    height: 24px;
    width: 120px;
    border-radius: 14px;
    padding-left: 6px;
    border: none;
    background: #e13e3e;
  }
  .search input::-webkit-input-placeholder {
    color: #e65d5d;
  }
  .config-box {
    margin-right: 40px;
  }
  .config-box li {
    width: 36px;
    height: 36px;
    float: right;
    margin: 25px 20px 0;
  }
  .config-box li button {
    background: none;
  }
  .user {
    position: absolute;
    right: 360px;
    top: 20px;
    height: 65px;
    cursor: pointer;
  }
  .user .el-avatar {
    vertical-align: middle;
    margin-right: 3px;
  }
  .user span {
    font-size: 12px;
    color: #fff;
  }
  .selectMenu {
    position: absolute;
    top: 65px;
    right: 280px;
    width: 250px;
    border: 1px solid rgb(214, 233, 227);
  }
  .selectMenu li {
    height: 40px;
    line-height: 40px;
    cursor: pointer;
  }
  .selectMenu li:nth-child(5) {
    border-bottom: 1px solid #d2d2d2;
  }
  .selectMenu li:nth-child(4) {
    border-top: 1px solid #d2d2d2;
  }
  .selectMenu li:hover {
    background: #f0f1f2;
  }
  .selectMenu li span {
    font-size: 13px;
    padding-left: 20px;
  }
  .selectMenu a {
    display: inline-block;
    width: 100%;
  }
  .selectMenu li i {
    float: right;
    margin-right: 5px;
    font-size: 12px;
    color: #9f9f9f;
  }
  .user i {
    font-size: 12px;
    margin-left: 5px;
    color: #f8baba
  }
  .selectMenu .iconhuaban26::before, .selectMenu .icondengji::before, .selectMenu .icongerenshezhi::before {
    font-size: 18px;
  }
  .selectMenu span::before {
    font-size: 16px;
    margin-right: 5px;
  }
  .aside {
    float: left;
    width: 200px;
    padding: 15px;
    border-right: 1px solid #e1e1e1;
  }
  .aside ul li {
    box-sizing: border-box;
    padding: 10px;
    line-height: 25px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .aside ul li:hover {
    background: #f6f6f7;
  }
  .aside .title span {
    color: #b4afaf;
    margin: 10px;
    margin-right: 0;
    font-size: 14px;
  }
  .aside .title i {
    color: #b4afaf;
    margin-left: 3px;
    font-size: 12px;
  }
  .aside .title i:hover {
    color: #6b6868;
  }
  .aside i {
    margin-right: 10px;
  }
  .aside .title {
    margin: 15px 0;
  }
  .main {
   float: left;
  }
  .current {
    font-weight: bold;
    background: #f6f6f7;
  }
</style>
