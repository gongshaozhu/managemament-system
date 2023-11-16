<template>
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
      <div class="home-head">
        <div style="display: flex;">
          <span class="collapse" @click="handleCollapse">
            <i :class="[collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></i>
          </span>
          <div style="line-height: 50px;padding-left: 20px;font-size: 20px">订单管理系统</div>
        </div>
        <el-dropdown>
        <span class="el-dropdown-link" style="cursor: pointer">
          <span>admin</span><i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="content">
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
    },
    handleOut () {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.main-content {
  flex: 1;
  display: flex;
  height: 100%;
  .nav-menu {
    flex-basis: 230px;
    transition: all .3s ease;
    background: #304156;
    overflow-y: auto;
    &::-webkit-scrollbar-track-piece {
      background: #d3dce6;
    }
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: #99a9bf;
      border-radius: 20px;
    }
  }
  .home-head {
    height: 50px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    padding: 0 30px;
    padding-left: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .collapse {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
      i {
        font-size: 25px;
      }
    }
  }
  .right-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    .content {
      flex: 1;
      padding: 16px;
      box-sizing: border-box;
      overflow-y: auto;
    }
  }
}
</style>
