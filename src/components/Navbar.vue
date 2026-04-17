<template>
  <el-header class="navbar">
    <div class="container">
      <div class="logo">
        <h2>眞白花音</h2>
      </div>

      <!-- 电脑端导航 -->
      <el-menu
        class="desktop-menu"
        mode="horizontal"
        :default-active="$route.path"
        router
        :ellipsis="false"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/profile">资料</el-menu-item>
        <el-menu-item index="/works">作品</el-menu-item>
        <el-menu-item index="/quotes">经典语录</el-menu-item>
        <el-menu-item index="/games">小游戏</el-menu-item>
        <el-menu-item index="/news">动态提醒</el-menu-item>
        <el-menu-item index="/about">关于本站</el-menu-item>
      </el-menu>

      <!-- 手机端汉堡菜单 -->
      <el-icon class="mobile-menu-icon" @click="isMobileMenuOpen = !isMobileMenuOpen">
        <Menu />
      </el-icon>
    </div>

    <!-- 手机端下拉菜单 -->
    <div v-if="isMobileMenuOpen" class="mobile-dropdown">
      <el-menu
        mode="vertical"
        :default-active="$route.path"
        router
        @select="isMobileMenuOpen = false"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/profile">资料</el-menu-item>
        <el-menu-item index="/works">作品</el-menu-item>
        <el-menu-item index="/quotes">经典语录</el-menu-item>
        <el-menu-item index="/games">小游戏</el-menu-item>
        <el-menu-item index="/news">动态提醒</el-menu-item>
        <el-menu-item index="/about">关于本站</el-menu-item>
      </el-menu>
    </div>
  </el-header>
</template>

<script setup>
import { ref } from 'vue'
import { Menu } from '@element-plus/icons-vue'
const isMobileMenuOpen = ref(false)
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,.1);
}
.container {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}
.logo h2 {
  margin: 0;
  color: #409eff;
  font-weight: 600;
  white-space: nowrap;
}
.desktop-menu {
  border-bottom: none;
  flex: 1;
  justify-content: flex-end;
}
.desktop-menu :deep(.el-menu--horizontal) {
  white-space: nowrap !important;
  overflow: visible !important;
  flex-wrap: nowrap !important;
}
.desktop-menu :deep(.el-menu--horizontal .el-menu-item) {
  float: none !important;
  display: inline-block !important;
}
.mobile-menu-icon {
  font-size: 24px;
  cursor: pointer;
  display: none;
}

/* 手机下拉菜单：窄框 + 文字居中 */
.mobile-dropdown {
  position: absolute;
  top: 100%;
  right: 12px;
  width: auto;
  min-width: unset;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,.15);
  z-index: 99;
}
.mobile-dropdown :deep(.el-menu) {
  border: none;
  width: auto;
}
.mobile-dropdown :deep(.el-menu-item) {
  text-align: center;
  justify-content: center;
  padding: 0 20px;
  height: 44px;
  line-height: 44px;
  width: auto;
  white-space: nowrap;
}

@media (max-width: 900px) {
  .desktop-menu { display: none; }
  .mobile-menu-icon { display: block; }
}
</style>