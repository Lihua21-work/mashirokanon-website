<template>
  <el-header class="navbar">
    <div class="container">
      <!-- Logo 区域 -->
      <router-link to="/" class="logo">
        <span class="logo-icon">🥬</span>
        <span class="logo-text">眞白花音</span>
        <span class="logo-badge">粉丝站</span>
      </router-link>

      <!-- 电脑端导航 -->
      <el-menu
        class="desktop-menu"
        mode="horizontal"
        :default-active="$route.path"
        router
        :ellipsis="false"
      >
        <el-menu-item index="/">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/profile">
          <el-icon><User /></el-icon>
          <span>资料</span>
        </el-menu-item>
        <el-menu-item index="/works">
          <el-icon><Headset /></el-icon>
          <span>作品</span>
        </el-menu-item>
        <el-menu-item index="/quotes">
          <el-icon><ChatDotRound /></el-icon>
          <span>经典语录</span>
        </el-menu-item>
        <el-menu-item index="/games">
          <el-icon><Basketball /></el-icon>
          <span>小游戏</span>
        </el-menu-item>
        <el-menu-item index="/news">
          <el-icon><Bell /></el-icon>
          <span>直播状态</span>
        </el-menu-item>
        <el-menu-item index="/about">
          <el-icon><InfoFilled /></el-icon>
          <span>关于本站</span>
        </el-menu-item>
      </el-menu>

      <!-- 手机端汉堡菜单按钮 -->
      <div class="mobile-toggle" @click="isMobileMenuOpen = !isMobileMenuOpen">
        <el-icon class="mobile-menu-icon">
          <Close v-if="isMobileMenuOpen" />
          <Menu v-else />
        </el-icon>
      </div>
    </div>

    <!-- 手机端下拉菜单浮层 -->
    <transition name="el-zoom-in-top">
      <div v-if="isMobileMenuOpen" class="mobile-dropdown-wrapper" @click.self="isMobileMenuOpen = false">
        <div class="mobile-dropdown">
          <el-menu
            mode="vertical"
            :default-active="$route.path"
            router
            @select="isMobileMenuOpen = false"
          >
            <el-menu-item index="/">
              <el-icon><HomeFilled /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/profile">
              <el-icon><User /></el-icon>
              <span>资料</span>
            </el-menu-item>
            <el-menu-item index="/works">
              <el-icon><Headset /></el-icon>
              <span>作品</span>
            </el-menu-item>
            <el-menu-item index="/quotes">
              <el-icon><ChatDotRound /></el-icon>
              <span>经典语录</span>
            </el-menu-item>
            <el-menu-item index="/games">
              <el-icon><Basketball /></el-icon>
              <span>小游戏</span>
            </el-menu-item>
            <el-menu-item index="/news">
              <el-icon><Bell /></el-icon>
              <span>直播状态</span>
            </el-menu-item>
            <el-menu-item index="/about">
              <el-icon><InfoFilled /></el-icon>
              <span>关于本站</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </transition>
  </el-header>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Menu, Close, HomeFilled, User, Headset, 
  ChatDotRound, Basketball, Bell, InfoFilled 
} from '@element-plus/icons-vue'

const isMobileMenuOpen = ref(false)
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 123, 155, 0.12);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  padding: 0;
  height: 64px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  cursor: pointer;
}

.logo-icon {
  font-size: 24px;
  transition: transform 0.3s ease;
}

.logo:hover .logo-icon {
  transform: rotate(15deg) scale(1.1);
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(135deg, #ff7b9b 0%, #36d399 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.5px;
}

.logo-badge {
  font-size: 11px;
  padding: 2px 8px;
  background: rgba(255, 123, 155, 0.1);
  color: var(--primary-color);
  border-radius: 12px;
  font-weight: 600;
}

.desktop-menu {
  border-bottom: none !important;
  background: transparent !important;
  display: flex;
  align-items: center;
  height: 100%;
}

.desktop-menu :deep(.el-menu-item) {
  height: 64px;
  line-height: 64px;
  font-size: 15px;
  font-weight: 500;
  color: var(--text-main) !important;
  border-bottom: 2px solid transparent !important;
  transition: all 0.3s ease;
  margin: 0 4px;
  padding: 0 16px;
  background: transparent !important;
}

.desktop-menu :deep(.el-menu-item .el-icon) {
  margin-right: 6px;
  font-size: 17px;
  color: var(--text-regular);
  transition: color 0.3s ease;
}

.desktop-menu :deep(.el-menu-item:hover) {
  color: var(--primary-color) !important;
  background: rgba(255, 123, 155, 0.05) !important;
  border-radius: 8px;
}

.desktop-menu :deep(.el-menu-item:hover .el-icon) {
  color: var(--primary-color);
}

.desktop-menu :deep(.el-menu-item.is-active) {
  color: var(--primary-color) !important;
  font-weight: 600;
  border-bottom-color: var(--primary-color) !important;
}

.desktop-menu :deep(.el-menu-item.is-active .el-icon) {
  color: var(--primary-color);
}

.mobile-toggle {
  display: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.mobile-toggle:hover {
  background: rgba(0, 0, 0, 0.05);
}

.mobile-menu-icon {
  font-size: 24px;
  color: var(--text-main);
}

/* 手机端下拉框 */
.mobile-dropdown-wrapper {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  z-index: 999;
}

.mobile-dropdown {
  background: #ffffff;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  padding: 12px 16px 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.mobile-dropdown :deep(.el-menu) {
  border: none;
}

.mobile-dropdown :deep(.el-menu-item) {
  height: 48px;
  line-height: 48px;
  border-radius: 10px;
  margin-bottom: 4px;
  font-size: 15px;
}

.mobile-dropdown :deep(.el-menu-item.is-active) {
  background: var(--primary-light) !important;
  color: var(--primary-color) !important;
  font-weight: 600;
}

@media (max-width: 900px) {
  .desktop-menu { display: none; }
  .mobile-toggle { display: block; }
}
</style>