<template>
  <div>
    <el-submenu v-if="data.children && data.children.length" :index="data.value"  popper-append-to-body>
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">{{data.label}}</span>
      </template>
      <MenuItem v-for="item in data.children" :collapse="collapse" :key="item.label" :data="item"></MenuItem>
    </el-submenu>
    <el-menu-item v-else :index="data.value" :route="data.path">
      <i class="el-icon-menu"></i>
      <span slot="title">{{data.label}}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    collapse: {
      type: Boolean,
      default: () => false,
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
}

</script>
