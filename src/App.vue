<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <Navbar />
    
    <!-- 路由出口 -->
    <router-view />
    
    <!-- 底部页脚 -->
    <el-footer class="footer">
      <div class="container">
        <p>© 2026 真白花音粉丝站</p>
      </div>
    </el-footer>
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
}

.footer {
  background-color: #303133;
  color: #fff;
  text-align: center;
  padding: 20px 0;
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>