<template>
  <div>
    home
    <el-button>Module</el-button>
<!--    <img v-for="v in list" :key="v.id" :src="v.image" alt="">-->
  </div>
</template>

<script>
export default {
  name: 'M1F',
  data() {
    return {
      list: [],
    }
  },
  async mounted () {
    const a = await this.$api.a.getHome()
    console.log('mock-demo', a)
    const b = await this.$api.a.getHomePost()
    this.list = b.data.post.list
    console.log('mock-demo', b.data.post.list)
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
img {
  width: 100px;
  height: 100px;
}
</style>
