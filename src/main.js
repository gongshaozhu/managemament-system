import Vue from 'vue'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import '@/components/svg-icon'
import './plugins'
import './index.less'
BScroll.use(MouseWheel)
Vue.config.productionTip = false
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
