<template>
  <el-menu
    :default-active="defaultActive"
    class="menu"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    :collapse="collapse"
    mode="vertical"
    :collapse-transition="false"
  >
<!--<M v-for="item in menuList" :key="item.label" :data="item"></M>-->
    <MenuItem :data="menuList"></MenuItem>
  </el-menu>
</template>

<script>
import MenuItem from './MenuItem.vue'
import {convertToTree} from "@/utils"
// import MenuList from './menuList'
export default {
  name: 'MenuP',
  data () {
    return {
      defaultActive: 'SaleGoods',
      isCollapse: true
    }
  },
  props: ['collapse'],
  watch: {
    $route: {
      handler () {
        this.filterMenuValue(this.menuList)
        // $store.state.keepAliveRoutes
        // this.defaultActive = v.value
      },
      deep: true,
      immediate: true,
    }
  },
  computed: {
    menuList () {
      return this.$store.state.menuList || []
    }
  },
  components: {
    MenuItem
  },
  created() {
    /*const menu = MenuList
    this.$store.commit('changeMenuList', menu)
    if (menu[0] && !menu[0].children) {
      this.$store.commit('addKeepAliveRoutes', menu[0])
    } else {
      this.$store.commit('addKeepAliveRoutes', menu[0].children[0])
    }*/
  },
  async mounted () {
    const res = await this.$store.dispatch('getInfo')
    // this.$api.auth.getUserInfo()
    // const roleAuth = []
    // res.menus.forEach(v => {
    //   roleAuth.push(v.name)
    // })
    const menus = convertToTree(res.menus, '0')
    this.handleMenuName(menus)
    // this.$store.commit('changeRoleAuth', roleAuth)
    // this.$store.commit('changeUserInfo', res)
    this.$store.commit('changeMenuList', menus)
    if (menus[0] && !menus[0].children) {
      this.$store.commit('addKeepAliveRoutes', menus[0])
    } else {
      this.$store.commit('addKeepAliveRoutes', menus[0].children[0])
    }
    this.filterMenuValue(this.menuList)
  },
  methods: {
    handleSelect (v) {
      if (this.$route.path === v.path) return
      if (v.componentName) {
        const { keepAliveRoutes } = this.$store.state
        const has = keepAliveRoutes.filter(k => k.componentName === v.componentName).length
        if (!has) {
          this.$store.commit('addKeepAliveRoutes', v)
        }
      }
      this.$router.push(v.path)
    },
    filterMenuValue (treeList) {
      treeList.forEach(v => {
        const { path } = this.$route
        if (v.path === path) {
          const { keepAliveRoutes } = this.$store.state
          const has = keepAliveRoutes.filter(k => k.componentName === v.componentName).length
          if (!has) {
            this.$store.commit('addKeepAliveRoutes', v)
          }
          this.defaultActive = v.value
          return
        }
        if (v.children && v.children.length) {
          this.filterMenuValue(v.children)
        }
      })
    },
    handleMenuName (value) {
      value.forEach(v => {
        v.componentName = v.name
        v.label = v.title
        v.value = v.name
        v.path = `/${v.name}`
        if (v.children && v.children.length) {
          this.handleMenuName(v.children)
        } else {
          delete v.children
        }
      })
    }
  }
}
</script>

<style lang="less">

</style>
