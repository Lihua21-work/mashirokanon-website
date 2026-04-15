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
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/profile">资料</el-menu-item>
        <el-menu-item index="/works">代表作品</el-menu-item>
        <el-menu-item index="/quotes">经典语录</el-menu-item>
        <el-menu-item index="/about">关于本站</el-menu-item>
      </el-menu>
      
      <!-- 手机端汉堡菜单 -->
      <el-icon class="mobile-menu-icon" @click="isMobileMenuOpen = true">
        <Menu />
      </el-icon>
    </div>
    
    <!-- 手机端抽屉菜单 -->
    <el-drawer
      v-model="isMobileMenuOpen"
      direction="right"
      title="导航菜单"
    >
      <el-menu
        mode="vertical"
        :default-active="$route.path"
        router
        @select="isMobileMenuOpen = false"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/profile">资料</el-menu-item>
        <el-menu-item index="/works">代表作品</el-menu-item>
        <el-menu-item index="/quotes">经典语录</el-menu-item>
        <el-menu-item index="/about">关于本站</el-menu-item>
      </el-menu>
    </el-drawer>
  </el-header>
</template>

<script setup>
import { ref } from 'vue'
import { Menu } from '@element-plus/icons-vue'

// 控制手机菜单的显示隐藏
const isMobileMenuOpen = ref(false)
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 0;
}

.container {
  max-width: 1200px;
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
}

.desktop-menu {
  border-bottom: none;
}

.mobile-menu-icon {
  font-size: 24px;
  cursor: pointer;
  display: none;
}

/* 手机端适配：小于768px显示汉堡菜单 */
@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }
  
  .mobile-menu-icon {
    display: block;
  }
}
</style>