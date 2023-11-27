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
// import M from './M.vue'
export default {
  name: 'MenuP',
  data () {
    return {
      defaultActive: 'form1',
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
    const a = [
      {
        value: 'form',
        label: '表单系列',
        children: [
          /*{
            value: 'multiFormCheck',
            label: '多表单校验',
            children: [
          },*/
          {
            value: 'form1',
            label: '表单1',
            path: '/home',
            componentName: 'M1',
            defaultActive: true,
          },
          {
            value: 'form2',
            label: '表单2',
            path: '/home1',
            componentName: 'M2',
          },
          {
            value: 'loopForm',
            label: '循环表单1',
            path: '/home2',
          },
          {
            value: 'loopForm2',
            label: '循环表单2',
            path: '/home2',
          },
          {
            value: 'loopForm3',
            label: '循环表单3',
            path: '/home2',
          },
          {
            value: 'loopForm4',
            label: '循环表单4',
            path: '/home2',
          },
        ]
      },
      {
        value: 'secondaryPackageCom',
        label: '封装组件',
        path: '/home3'
      }
    ]
    this.$store.commit('changeMenuList', a)
    if (a[0] && !a[0].children) {
      this.$store.commit('addKeepAliveRoutes', a[0])

    } else {
      this.$store.commit('addKeepAliveRoutes', a[0].children[0])
    }
  },
  mounted () {
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
    findDefaultHome () {

    }
  }
}
</script>

<style lang="less">

</style>
