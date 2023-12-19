<template>
  <div class="Wrapper404">
    <h6>
      <svg-icon icon-class="404"></svg-icon>
      Not Found
    </h6>
    <el-button type="primary" @click="handleBack">去首页</el-button>
  </div>
</template>

<script>
export default {
  name: 'WrapperFour404',
  data () {
    return {}
  },
  methods: {
    handleBack() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="less">
.Wrapper404 {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  flex-direction: column;
  h6 {
    display: flex;
    align-items: center;
    color: #666;
    font-size: 30px;
  }
  svg {
    width: 70px;
    height: 70px;
    color: #666;
    margin-right: 20px;
  }
}
</style>
