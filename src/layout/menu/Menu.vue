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
    <Menu :data="menuList"></Menu>
  </el-menu>
</template>

<script>
import Menu from './MenuItem.vue'
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
            {
              value: 'multiFormCheck',
              label: '多表单校验',
              children: [
                {
                  value: 'form1',
                  label: '表单1',
                  path: 'home',
                },
                {
                  value: 'form2',
                  label: '表单2',
                  path: '/home1',
                }
              ]
            },
            {
              value: 'loopForm',
              label: '循环表单',
              path: '/home2',
            }
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
    Menu
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less">

</style>
