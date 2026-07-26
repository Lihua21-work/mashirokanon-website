<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <Navbar />
    
    <!-- 路由出口（带优雅切页过渡动画） -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <!-- 底部页脚 -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <span class="footer-title">🥬 眞白花音粉丝站</span>
            <p class="footer-desc">记录 Mashiro Kanon 的精彩瞬间，守护最可爱的白菜娘。</p>
          </div>
          <div class="footer-links">
            <a href="https://space.bilibili.com/401480763" target="_blank">B站主页</a>
            <a href="https://live.bilibili.com/21402309/" target="_blank">直播间</a>
            <router-link to="/about">关于站点</router-link>
          </div>
        </div>
        <el-divider class="footer-divider" />
        <div class="footer-bottom">
          <p>© 2026 眞白花音粉丝站 · Crafted with <span class="heart">♥</span> for Mashiro Kanon</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-gradient);
}

.main-content {
  flex: 1;
}

.footer {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 123, 155, 0.12);
  color: var(--text-regular);
  padding: 40px 0 24px;
  margin-top: 60px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main);
}

.footer-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 6px;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links a {
  color: var(--text-regular);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--primary-color);
}

.footer-divider {
  margin: 24px 0 16px !important;
  border-color: rgba(0, 0, 0, 0.06) !important;
}

.footer-bottom {
  text-align: center;
  font-size: 13px;
  color: var(--text-secondary);
}

.heart {
  color: #ff5c83;
  display: inline-block;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@media (max-width: 640px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>