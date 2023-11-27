import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: [1001, 1002, 1003],
    keepAliveRoutes: [],
    menuList: [],
  },
  getters: {
  },
  mutations: {
    changeMenuList(state, data) {
      state.menuList = data
    },
    addKeepAliveRoutes(state, data) {
      state.keepAliveRoutes.push(data)
    },
    removeKeepAliveRoutes(state, index) {
      state.keepAliveRoutes.splice(index, 1)
    },
  },
  actions: {
  },
  modules: {
    user
  }
})
