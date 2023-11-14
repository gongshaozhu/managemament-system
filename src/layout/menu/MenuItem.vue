<template>
  <div>
    <div v-for="item in data" :key="item.value">
      <el-submenu
        v-if="item.children || (Array.isArray(item.children) && item.children.length)"
        :index="`${item.value}${item.label}`"
      >
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.label}}</span>
        </template>
        <MenuItem :data="item.children"></MenuItem>
      </el-submenu>
      <el-menu-item v-else :index="item.value" :route="item.path">
        <i class="el-icon-menu"></i>
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
}

</script>
