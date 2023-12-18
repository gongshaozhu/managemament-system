<template>
  <div>
    <div v-for="item in data" :key="item.value">
      <el-submenu
        v-if="item.children || (Array.isArray(item.children) && item.children.length)"
        :index="`${item.value}${item.label}`"
      >
        <template slot="title">
          <i :class="[item.icon || 'el-icon-s-order']"></i>
          <span slot="title">{{item.label}}</span>
        </template>
        <MenuItem :data="item.children"/>
      </el-submenu>
      <el-menu-item
        v-else
        :index="item.value"
        @click.native="handleSelect(item)"
      >
        <i :class="[item.icon || 'el-icon-s-order']"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    data: {
      type: Array,
      default: () => []
    }
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
    }
  }
}

</script>
