<template>
  <div class="about">
    <div class="container">
      <h1 class="page-title">关于本站</h1>
      
      <el-card class="about-card">
        <h3>网站介绍</h3>
        <p>
          本站是一个关于虚拟YouTuber眞白花音的粉丝向网站，旨在为粉丝们提供一个了解和交流眞白花音的平台。
        </p>
        <p>
          本站使用Vue3+Vite+Element Plus技术开发，采用响应式设计，能够在各种设备上正常显示。
        </p>
        
        <h3 style="margin-top: 30px">免责声明</h3>
        <p>
          本站所有内容均来自互联网，仅供学习交流使用，不用于任何商业用途。
          如有侵权，请联系我们删除。
        </p>
        
        <h3 style="margin-top: 30px">作者信息</h3>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="作者">李华-白菜工厂打工鬼</el-descriptions-item>
          <el-descriptions-item label="B站主页">
            <a href="https://space.bilibili.com/486458694?" target="_blank" style="color: #409eff; text-decoration: none;">
              点击访问我的B站空间
            </a>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-title {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
}

.about-card {
  padding: 30px;
}

.about-card h3 {
  margin-bottom: 15px;
  color: #333;
}

.about-card p {
  line-height: 1.8;
  color: #666;
}
</style>