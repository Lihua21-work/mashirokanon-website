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
    path: '/games',
    name: 'Games',
    component: () => import('@/pages/Games.vue'),
    meta: { title: '小游戏' }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/pages/News.vue'),
    meta: { title: '动态提醒' }
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
  routes: dynamicRouters,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 动态修改页面标题
router.afterEach((to) => {
  document.title = to.meta && to.meta.title ? `${to.meta.title} - 眞白花音粉丝站` : '眞白花音粉丝站'
})

export default router