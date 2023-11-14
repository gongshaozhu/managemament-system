<template>
  <div class="LoginWrapper" @click="handleLogin">
    登录页
  </div>
</template>

<script>
export default {
  name: 'LoginWrapper',
  data () {
    return {}
  },
  methods: {
    handleLogin () {
      localStorage.setItem('token', '1')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="less">
.LoginWrapper {

}
</style>
