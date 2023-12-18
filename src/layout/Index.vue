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
      <div class="home-tabs scroll-wrapper" ref="scroll">
        <div class="scroll-content" >
          <span
            class="scroll-item"
            :class="{active: $route.path === v.path}"
            @click="handleTabRoute(v)"
            v-for="(v, i) in needKeepAliveRoutes"
            :key="v.path"
          >
            {{ v.label }} <i v-if="i!==0" class="el-icon-close" @click="handleClearKeepAlive(v)"></i>
          </span>
        </div>
      </div>
      <div class="content">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="needKeepAlive">
            <router-view/>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/layout/menu/Menu.vue'
import BetterScroll from 'better-scroll'
// import BetterScroll from '@better-scroll/core'
export default {
  name: 'homeview',
  data () {
    return {
      collapse: false,
      isTransition: false
    }
  },
  components: {
    Menu,
  },
  computed: {
    needKeepAlive () {
      const { keepAliveRoutes } = this.$store.state
      const componentNames = keepAliveRoutes.map(v => v.componentName)
      return componentNames || []
    },
    needKeepAliveRoutes () {
      const { keepAliveRoutes } = this.$store.state
      return keepAliveRoutes || []
    }
  },
  mounted() {
    new BetterScroll(this.$refs.scroll, {
      // movable: true,
      // zoom: true,
      scrollX: true,
      scrollY: false,
      bounce: false,
      scrollbar: {
        // fade: false,
        interactive: true,
        scrollbarTrackClickable: true,
        scrollbarTrackOffsetType: 'clickedPoint' // can use 'step'
      },
      mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300
      }
    })
  },
  methods: {
    handleTabRoute(v) {
      if (this.$route.path === v.path) return
      this.$router.push(v.path)
    },
    handleClearKeepAlive(v) {
      const { keepAliveRoutes } = this.$store.state
      const index = keepAliveRoutes.findIndex(k => k.componentName === v.componentName)
      console.log(keepAliveRoutes, index)
      if (index === (keepAliveRoutes.length - 1)) {
        this.$store.commit('removeKeepAliveRoutes', index)
        // const r = this.$store.state.keepAliveRoutes
        this.$router.push(keepAliveRoutes[keepAliveRoutes.length - 1].path)
      } else {
        this.$store.commit('removeKeepAliveRoutes', index)
        this.$router.push(keepAliveRoutes[index].path)
      }
      // if (v.componentName) {
      //   const has = keepAliveRoutes.filter(k => k.componentName === v.componentName).length
      //   if (!has) {
      //     this.$store.commit('addKeepAliveRoutes', v)
      //   }
      // }
    },
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
  .home-tabs {
    height: 35px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    //display: flex;
    //flex-wrap: nowrap;
    width: 100%;
  }
  .scroll-wrapper {
    position: relative;
    width: 100%;
    white-space: nowrap;
    border-radius: 5px;
    overflow: hidden;
    .scroll-content {
      display: inline-block;
      height: 35px;
      .scroll-item {
        line-height: 30px;
        height: 30px;
        display: inline-block;
        text-align: center;
        position: relative;
        cursor: pointer;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        box-sizing: border-box;
        margin-left: 5px;
        margin-top: 2px;
        i {
          font-size: 14px;
          &:hover {
            color: #FFF;
            opacity: .7;
            background: rgba(0, 0, 0, .3);
            border-radius: 50%;
          }
        }
      }
      .active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &:before {
          content: '';
          display: inline-block;
          background: #FFF;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 4px;
        }
      }
    }

  }
  .right-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    .content {
      flex: 1;
      padding: 16px;
      box-sizing: border-box;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
