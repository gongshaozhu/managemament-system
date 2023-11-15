<template>
  <el-menu
    :default-active="defaultActive"
    class="menu"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    :router="true"
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
      menuList: [
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
            },
            {
              value: 'form2',
              label: '表单2',
              path: '/home1',
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
      ],
      isCollapse: true
    }
  },
  props: ['collapse'],
  computed: {
    abc () {
      return this.$router.options.routes
    }
  },
  components: {
    MenuItem
  },
  watch: {
  },
  mounted () {
    this.filterMenuValue(this.menuList)
  },
  methods: {
    filterMenuValue (treeList) {
      treeList.forEach(v => {
        const { path } = this.$route
        if (v.path === path) {
          this.defaultActive = v.value
          return
        }
        if (v.children && v.children.length) {
          this.filterMenuValue(v.children)
        }
      })
    }
  }
}
</script>

<style lang="less">

</style>
