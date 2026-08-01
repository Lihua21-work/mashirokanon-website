<template>
  <div class="profile-page">
    <div class="container">
      <h1 class="page-title">个人资料</h1>

      <el-row :gutter="28">
        <!-- 左侧个人名片 -->
        <el-col :xs="24" :md="8">
          <div class="avatar-card">
            <div class="avatar-wrapper">
              <img src="@/assets/images/avatar.jpg" alt="眞白花音头像" class="avatar-img" />
              <div class="avatar-ring"></div>
            </div>
            <h2 class="name">眞白花音</h2>
            <p class="subname">ましろ かのん / Mashiro Kanon</p>
            <div class="nickname-tag">
              <span>昵称：白菜 🥬</span>
            </div>

            <el-divider style="margin: 20px 0 16px;" />

            <div class="quick-stats">
              <div class="stat-item">
                <span class="stat-num">2020.04</span>
                <span class="stat-label">正式出道</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-num">日本</span>
                <span class="stat-label">所在地</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-num">个人势</span>
                <span class="stat-label">所属</span>
              </div>
            </div>
          </div>
        </el-col>

        <!-- 右侧详细信息 -->
        <el-col :xs="24" :md="16">
          <div class="info-section">
            <el-card class="section-card">
              <template #header>
                <div class="card-header">
                  <el-icon><User /></el-icon>
                  <span>基础档案</span>
                </div>
              </template>

              <el-descriptions :column="isMobile ? 1 : 2" border class="custom-descriptions">
                <el-descriptions-item label="性别">
                  <span class="gender-box">
                    <span>女</span>
                    <span class="gender-symbol">♀</span>
                  </span>
                </el-descriptions-item>
                <el-descriptions-item label="生日">5月29日 (双子座)</el-descriptions-item>
                <el-descriptions-item label="身高">158 cm</el-descriptions-item>
                <el-descriptions-item label="职业">虚拟 VUP / 歌姬</el-descriptions-item>
                <el-descriptions-item label="出道时间">2020年4月12日</el-descriptions-item>
                <el-descriptions-item label="精通语言">日语、中文（流利）</el-descriptions-item>
                <el-descriptions-item label="代表色">
                  <span class="color-badge pink">白色</span>
                  <span class="color-badge green">粉色</span>
                </el-descriptions-item>
                <el-descriptions-item label="粉丝名称">帕清姬 (Patsuyuki)</el-descriptions-item>
              </el-descriptions>
            </el-card>

            <el-card class="section-card" style="margin-top: 24px;">
              <template #header>
                <div class="card-header">
                  <el-icon><Notebook /></el-icon>
                  <span>个人简介与经历</span>
                </div>
              </template>
              
              <div class="bio-content">
                <p>
                  眞白花音是一名来自日本的个人势 VUP，于 2020 年 4 月 12 日正式开启直播活动。
                  她拥有出色的中文语言学习天赋与惊人的表达能力，能够用中文与观众无障碍交流、看懂中文梗，这让她在中国拥有极高的人气与广泛的粉丝基础。
                </p>
                <p>
                  她的直播节目极其丰富，包含翻唱歌会、各种有趣的新旧游戏实况、中日文杂谈、互动绘画等。
                  性格积极乐观、风趣幽默，经常用甜美的笑容和真诚的态度温暖每一位支持她的观众。
                </p>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { User, Notebook } from '@element-plus/icons-vue'

const isMobile = ref(false)
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.avatar-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: 36px 24px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  margin-bottom: 24px;
}

.avatar-wrapper {
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto 20px;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 2;
  border: 4px solid #ffffff;
  box-shadow: 0 8px 20px rgba(255, 123, 155, 0.2);
}

.avatar-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff7b9b 0%, #36d399 100%);
  z-index: 1;
  opacity: 0.8;
  animation: rotateRing 8s linear infinite;
}

@keyframes rotateRing {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.name {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 6px 0;
}

.subname {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 16px 0;
}

.nickname-tag {
  display: inline-block;
  background: var(--primary-light);
  color: var(--primary-color);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.quick-stats {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-num {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-main);
}

.stat-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.stat-divider {
  width: 1px;
  height: 24px;
  background: rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
}

.custom-descriptions :deep(.el-descriptions__label) {
  font-weight: 600;
  color: var(--text-main);
  background: rgba(255, 123, 155, 0.04) !important;
  width: 120px;
}

.gender-box {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  vertical-align: middle;
}

.gender-symbol {
  color: #ff7b9b;
  font-weight: 700;
  font-size: 15px;
  line-height: 1;
  display: inline-block;
  transform: translateY(-0.5px);
}

.color-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  margin-right: 6px;
}

.color-badge.pink {
  background: #ffe3eb;
  color: #e56283;
}

.color-badge.green {
  background: #e6f9f0;
  color: #2eb885;
}

.bio-content p {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-regular);
  margin-bottom: 14px;
}

.bio-content p:last-child {
  margin-bottom: 0;
}
</style>