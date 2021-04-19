import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/global.css'
import axios from 'axios'
import './assets/font/iconfont.css'

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
