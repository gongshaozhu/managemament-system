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
    redirect: '/SaleGoods',
    component: HomeView,
    children: [
      {
        path: 'SaleGoods',
        name: 'SaleGoods',
        component: () => import(/* webpackChunkName: "SaleGoods" */ '@/views/order_manage/AllOrder.vue'),
        meta: {
          auth: ['SaleGoods']
        }
      },
      {
        path: 'MyOrder',
        name: 'MyOrder',
        component: () => import(/* webpackChunkName: "MyOrder" */ '@/views/order_manage/MyOrder.vue'),
        meta: {
          auth: ['MyOrder']
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

router.beforeEach(async (to, from, next) => {
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
      if (from.path === '/') {
        await store.dispatch('getInfo')
        hasPermission(to.meta.auth) ? next() : next('/404')
      } else {
        next('/404')
      }
    }
  }
  // NProgress.done()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
