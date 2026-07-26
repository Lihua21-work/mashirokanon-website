<template>
  <div class="about-page">
    <div class="container">
      <h1 class="page-title">关于本站</h1>
      
      <div class="about-card">
        <div class="section-block">
          <h3 class="block-title">🌸 网站宗旨</h3>
          <p class="block-text">
            本站是一个关于虚拟 VUP <b>眞白花音（Mashiro Kanon）</b> 的非官方粉丝向交流与展示网站，旨在为广大的帕清姬们提供一个了解花音资料、作品、经典名场面与活动动态的温馨平台。
          </p>
        </div>

        <el-divider />

        <div class="section-block">
          <h3 class="block-title">🛠️ 技术实现</h3>
          <p class="block-text">
            本站采用现代 Web 前端技术栈构建，具有良好的响应式适配能力与平滑的交互体验：
          </p>
          <div class="tech-tags">
            <el-tag effect="dark" type="danger" round>Vue 3</el-tag>
            <el-tag effect="dark" type="warning" round>Vite 7</el-tag>
            <el-tag effect="dark" type="primary" round>Element Plus</el-tag>
            <el-tag effect="dark" type="success" round>Pinia</el-tag>
            <el-tag effect="dark" type="info" round>Vue Router</el-tag>
          </div>
        </div>

        <el-divider />

        <div class="section-block">
          <h3 class="block-title">⚖️ 免责声明</h3>
          <p class="block-text desc-text">
            本站所有引用的视频封面、卡片图像及音乐作品版权均归原作者、画师及 眞白花音（Mashiro Kanon）所有。本站仅供粉丝交流与学习展示使用，不含任何商业盈利行为。如有版权疑虑请联系删除。
          </p>
        </div>

        <el-divider />

        <div class="section-block">
          <h3 class="block-title">👤 站点站长 / 作者信息</h3>
          <el-descriptions :column="1" border class="author-desc">
            <el-descriptions-item label="作者昵称">李华 - 白菜工厂打工鬼 🥬</el-descriptions-item>
            <el-descriptions-item label="B站个人主页">
              <a href="https://space.bilibili.com/486458694?" target="_blank" class="author-link">
                点击访问站长 B 站空间 ↗
              </a>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 24px;
}

.about-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: 36px;
  box-shadow: var(--shadow-sm);
}

.block-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 12px 0;
}

.block-text {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-regular);
  margin: 0;
}

.desc-text {
  color: var(--text-secondary);
  font-size: 14px;
}

.tech-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 14px;
}

.author-desc {
  margin-top: 12px;
}

.author-desc :deep(.el-descriptions__label) {
  font-weight: 600;
  width: 140px;
  background: rgba(255, 123, 155, 0.04) !important;
}

.author-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.author-link:hover {
  color: var(--primary-hover);
}
</style>