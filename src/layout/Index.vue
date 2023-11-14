<template>
  <div class="home">
    <div class="home-head" @click="handleCollapse">
      <span></span>
      <span>user</span>
    </div>
    <div class="main-content">
      <div
        id="nav-menu"
        class="nav-menu"
        :class="[collapse ? 'hideMenu' : 'show-menu', isTransition ? 'isTransition' : '']"
        :style="{'flex-basis': collapse ? '64px': '230px'}"
      >
        <Menu :collapse="collapse"/>
      </div>
      <div class="right-content">
        <transition name="fade-transform" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/layout/menu/Menu.vue'

export default {
  name: 'HomeView',
  data () {
    return {
      collapse: false,
      isTransition: false
    }
  },
  components: {
    Menu,
  },
  methods: {
    handleCollapse () {
      this.collapse = !this.collapse
      this.isTransition = true
      const timer = setTimeout(() => {
        this.isTransition = false
        clearTimeout(timer)
      }, 30)
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  .home-head {
    height: 50px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .main-content {
    flex: 1;
    display: flex;
    .nav-menu {
      flex-basis: 230px;
      transition: all .3s ease;
      background: #304156;
    }
    .show-menu {
      overflow: hidden;
    }
    .right-content {
      padding: 16px;
      box-sizing: border-box;
      flex: 1;
    }
  }
}
</style>
