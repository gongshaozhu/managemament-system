import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import auth from "@/api/auth";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: ['SaleGoods'],
    keepAliveRoutes: [],
    menuList: [],
    userInfo: null,
  },
  getters: {
  },
  mutations: {
    changeUserInfo(state, data) {
      state.userInfo = data
    },
    changeRoleAuth(state, data) {
      state.role = data
    },
    changeMenuList(state, data) {
      state.menuList = data
    },
    addKeepAliveRoutes(state, data) {
      const has = state.keepAliveRoutes.find(v => v.componentName === data.componentName)
      if (!has) {
        state.keepAliveRoutes.push(data)
      }
    },
    removeKeepAliveRoutes(state, index) {
      state.keepAliveRoutes.splice(index, 1)
    },
  },
  actions: {
    async getInfo({ commit }) {
      try {
        const res = await auth.getUserInfo()
        const roleAuth = []
        res.menus.forEach(v => {
          roleAuth.push(v.name)
        })
        commit('changeRoleAuth', roleAuth)
        commit('changeUserInfo', res)
        return res
      } catch (e) {
        commit('changeRoleAuth', ['SaleGoods'])
        return e
      }
    },
  },
  modules: {
    user
  }
})
