import { createRouter, createWebHashHistory } from "vue-router";

export const dynamicRouters = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/pages/Profile.vue'),
    meta: { title: '个人资料' }
  },
  {
    path: '/works',
    name: 'Works',
    component: () => import('@/pages/Works.vue'),
    meta: { title: '代表作品' }
  },
  {
    path: '/quotes',
    name: 'Quotes',
    component: () => import('@/pages/Quotes.vue'),
    meta: { title: '经典语录' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/About.vue'),
    meta: { title: '关于本站' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: dynamicRouters
})

// 跳转页面后自动滚动到顶部
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

export default router