<template>
  <div class="root">
    <div class="navigate">
      <ul @click="currentStyle">
        <li class="current"><router-link to="/recommend">个人推荐</router-link></li>
        <li><router-link to="/songlist">歌单</router-link></li>
        <li> <router-link to="/commend">主播电台</router-link></li>
        <li><router-link to="/commend">排行榜</router-link></li>
        <li><router-link to="/songer">歌手</router-link></li>
        <li><router-link to="/commend">最新音乐</router-link></li>
      </ul>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      currentStyle(e) {
        const a = e.currentTarget.children
        a.forEach(element => {
          element.classList.remove('current')
        })
        e.target.classList.add('current')
      }
    }
  }
</script>

<style scoped>
  /* .root {
   width: 700px;
  } */
  .navigate {
    height: 48px;
    padding-top:30px;
    margin-left: 40px;
  }
  .navigate li {
    float: left;
    margin: 0 16px;
    padding-bottom: 4px;
  }
  .navigate .current {
    font-size: 18px;
    font-weight: bold;
    border-bottom: 3px solid #ec4141;
    padding-bottom: 6px;
  }
</style>
