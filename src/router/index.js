import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/layout/Index.vue'
import Login from '@/views/Login.vue'
import Page404 from '@/views/404.vue'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from '@/store'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    component: HomeView,
    children: [
      {
        path: 'home',
        name: 'home1',
        component: () => import(/* webpackChunkName: "M1" */ '@/views/M1.vue'),
        meta: {
          auth: [1001]
        }
      },
      {
        path: 'home1',
        name: 'home2',
        component: () => import(/* webpackChunkName: "M2" */ '@/views/M2.vue'),
        meta: {
          auth: [1002]
        }
      },
      {
        path: 'home2',
        name: 'home3',
        component: () => import(/* webpackChunkName: "M3" */ '@/views/M3.vue'),
        meta: {
          auth: [1003]
        }
      },
      {
        path: '/permission-refused',
        name: 'permissionRefused',
        component: () => import(/* webpackChunkName: "Refuse" */ '@/views/Refuse.vue')
      },
    ]
  },//
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/404',
    name: 'p404',
    component: Page404
  },
  {
    path: '*',
    name: 'others',
    redirect: '/404'
  },
]
// asyncRoutes
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export const hasPermission = (authArr) => {
  return store.state.role.some(v => authArr.includes(v))
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = localStorage.getItem('token')
  if (!token && to.path !== '/login') {
    next('/login')
  } else if (token && to.path === '/login') {
    next('/')
  } else {
    if (
      (to.meta.auth && hasPermission(to.meta.auth)) ||
      to.meta.auth == null ||
      (to.meta.auth && to.meta.auth.length === 0)) {
      next()
    } else {
      next('/permission-refused')
    }
  }
  // NProgress.done()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
