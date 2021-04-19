import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import Index from '../components/Index.vue'
import Find from '../components/FindMusic.vue'
import Recommend from '../components/findMusic/Recommend.vue'
import SongList from '../components/findMusic/SongList.vue'

Vue.use(VueRouter)

// axios.interceptors.response.use(config => {
//   const res = config.data
// })

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  {
    path: '/index',
    redirect: '/find',
    component: Index,
    children: [
      {
        path: '/find',
        component: Find,
        redirect: '/recommend',
        children: [
          { path: '/recommend', component: Recommend },
          { path: '/songlist', component: SongList },
          { path: '/songlist', component: SongList },
          { path: '/songlist', component: SongList },
          { path: '/songlist', component: SongList }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
