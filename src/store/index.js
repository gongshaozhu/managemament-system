import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: [1001, 1003]
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  }
})
