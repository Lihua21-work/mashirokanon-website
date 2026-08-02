<template>
  <div class="news-page">
    <div class="container">
      <h1 class="page-title">直播状态</h1>
      <p class="subtitle">真白花音 B 站官方直播间实时状态 🎥</p>

      <!-- 控制与操作工具栏 -->
      <div class="control-bar">
        <div class="control-left">
          <div class="section-badge">
            <el-icon class="header-icon pink"><VideoCamera /></el-icon>
            <span class="section-title">直播间看板</span>
          </div>
        </div>

        <div class="control-right">
          <span class="last-update-time" v-if="lastUpdated">
            更新于 {{ lastUpdated }}
          </span>
          <el-button 
            type="primary" 
            size="small" 
            round 
            :loading="isLoading"
            @click="loadData(true)"
          >
            <el-icon style="margin-right: 4px;"><Refresh /></el-icon>
            刷新状态
          </el-button>
          <el-button type="info" size="small" round plain @click="openBiliSpace">
            <el-icon style="margin-right: 4px;"><Link /></el-icon>
            前往 B 站主页
          </el-button>
        </div>
      </div>

      <!-- 直播开播状态高亮面板 -->
      <div class="live-banner-card" :class="{ 'is-live': liveInfo.isLive }">
        <div class="live-banner-content">
          <div class="live-badge-wrapper">
            <span v-if="liveInfo.isLive" class="pulse-dot live"></span>
            <span v-else class="pulse-dot offline"></span>
            <span class="live-status-title">
              {{ liveInfo.isLive ? '🔴 LIVE 正在直播中' : '⚪ 目前暂未开播' }}
            </span>
            <el-tag v-if="liveInfo.online > 0" type="danger" size="small" round style="margin-left: 8px;">
              🔥 人气 {{ formatOnline(liveInfo.online) }}
            </el-tag>
          </div>

          <h2 class="live-room-title">
            {{ liveInfo.title ? `直播间标题：${liveInfo.title}` : '真白花音 Bilibili 官方直播间 (21402309)' }}
          </h2>

          <p class="live-room-desc">
            {{ liveInfo.isLive ? '花音正处于直播陪伴中，快点击右侧按钮进入直播间互动吧！' : '关注直播间，不错过下一次惊艳的 Live 陪伴~ (房间号: 21402309)' }}
          </p>
        </div>

        <div class="live-banner-action">
          <el-button 
            :type="liveInfo.isLive ? 'danger' : 'primary'" 
            size="large" 
            round 
            class="live-btn"
            @click="openLive"
          >
            <el-icon style="margin-right: 6px;"><VideoCamera /></el-icon>
            {{ liveInfo.isLive ? '进入直播间' : '前往直播间' }}
          </el-button>
        </div>
      </div>

      <!-- 直播间详细信息卡片 -->
      <div class="info-card">
        <h3 class="info-card-title">
          <el-icon style="margin-right: 6px; color: var(--primary-color);"><InfoFilled /></el-icon>
          直播间基本信息
        </h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">主播名称</span>
            <span class="info-value">眞白花音 (Mashiro Kanon)</span>
          </div>
          <div class="info-item">
            <span class="info-label">B站房间号</span>
            <span class="info-value">21402309</span>
          </div>
          <div class="info-item">
            <span class="info-label">直播间连接</span>
            <a href="https://live.bilibili.com/21402309" target="_blank" class="info-link">
              live.bilibili.com/21402309 <el-icon><TopRight /></el-icon>
            </a>
          </div>
          <div class="info-item">
            <span class="info-label">个人主页</span>
            <a href="https://space.bilibili.com/401480763" target="_blank" class="info-link">
              space.bilibili.com/401480763 <el-icon><TopRight /></el-icon>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { VideoCamera, Refresh, Link, TopRight, InfoFilled } from '@element-plus/icons-vue'
import { fetchLiveStatus } from '@/utils/bilibili'

const isLoading = ref(false)
const lastUpdated = ref('')

// 直播状态数据
const liveInfo = ref({
  isLive: false,
  title: '',
  online: 0,
  roomUrl: 'https://live.bilibili.com/21402309'
})

const formatOnline = (online) => {
  if (!online) return 0
  if (online >= 10000) {
    return (online / 10000).toFixed(1) + ' 万'
  }
  return online.toString()
}

// 加载实时数据
const loadData = async (manual = false) => {
  isLoading.value = true
  try {
    const liveRes = await fetchLiveStatus()
    if (liveRes) {
      liveInfo.value = liveRes
    }

    const now = new Date()
    lastUpdated.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
  } catch (err) {
    console.error('加载直播数据失败:', err)
  } finally {
    isLoading.value = false
  }
}

const openBiliSpace = () => {
  window.open('https://space.bilibili.com/401480763', '_blank')
}

const openLive = () => {
  window.open(liveInfo.value.roomUrl || 'https://live.bilibili.com/21402309/', '_blank')
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 24px;
}

.subtitle {
  text-align: center;
  color: var(--text-secondary);
  font-size: 15px;
  margin-top: -24px;
  margin-bottom: 24px;
}

/* 直播开播状态 Banner 卡片 */
.live-banner-card {
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--card-border, rgba(0, 0, 0, 0.08));
  border-radius: var(--radius-lg, 16px);
  padding: 24px 28px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.live-banner-card.is-live {
  background: linear-gradient(135deg, #fff5f7 0%, #ffffff 100%);
  border: 1.5px solid #ff7b9b;
  box-shadow: 0 6px 24px rgba(255, 123, 155, 0.15);
}

.live-banner-content {
  flex: 1;
  padding-right: 20px;
}

.live-badge-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.pulse-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.pulse-dot.live {
  background-color: #ef4444;
  box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  animation: pulse-red 1.6s infinite;
}

.pulse-dot.offline {
  background-color: #94a3b8;
}

@keyframes pulse-red {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 8px rgba(239, 68, 68, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
}

.live-status-title {
  font-weight: 700;
  font-size: 14px;
  color: var(--text-main);
}

.live-room-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main);
  margin: 4px 0 6px 0;
  line-height: 1.4;
}

.live-room-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

.live-btn {
  font-weight: 600;
  padding: 12px 24px;
  box-shadow: 0 4px 12px rgba(255, 123, 155, 0.25);
}

/* 顶部操作工具栏 */
.control-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  padding: 12px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
  border: 1px solid rgba(255, 123, 155, 0.15);
}

.control-left, .control-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-badge {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-icon.pink {
  color: var(--primary-color, #ff7b9b);
  font-size: 18px;
}

.section-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-main);
}

.last-update-time {
  font-size: 12px;
  color: var(--text-secondary);
  margin-right: 4px;
}

/* 直播间信息卡片 */
.info-card {
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--card-border, rgba(0, 0, 0, 0.08));
  border-radius: var(--radius-lg, 16px);
  padding: 24px 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.info-card-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 18px 0;
  display: flex;
  align-items: center;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.info-label {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 500;
}

.info-value {
  font-size: 14px;
  color: var(--text-main);
  font-weight: 600;
}

.info-link {
  font-size: 14px;
  color: var(--primary-color, #ff7b9b);
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.info-link:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .live-banner-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .live-banner-action {
    width: 100%;
  }
  .live-btn {
    width: 100%;
  }
  .control-bar {
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
  }
  .control-right {
    justify-content: space-between;
  }
}
</style>
