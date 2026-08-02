<template>
  <div class="news-page">
    <div class="container">
      <h1 class="page-title">动态提醒</h1>
      <p class="subtitle">真白花音 B 站最新动态与实时直播状态 🔔</p>

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
            {{ liveInfo.title ? `直播间名称：${liveInfo.title}` : '真白花音 Bilibili 官方直播间 (21402309)' }}
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

      <!-- 控制与操作工具栏 -->
      <div class="control-bar">
        <div class="control-left">
          <div class="section-badge">
            <el-icon class="header-icon pink"><ChatDotSquare /></el-icon>
            <span class="section-title">最新 5 条动态提醒</span>
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
            刷新动态
          </el-button>
          <el-button type="info" size="small" round plain @click="openBiliSpace">
            <el-icon style="margin-right: 4px;"><Link /></el-icon>
            前往 B站 主页
          </el-button>
        </div>
      </div>

      <!-- 动态提醒列表卡片 -->
      <div class="box-card">
        <div class="timeline-container" v-loading="isLoading">
          <el-timeline v-if="kanonNews.length > 0">
            <el-timeline-item
              v-for="(item, index) in displayNews"
              :key="item.id || index"
              :type="item.type || 'primary'"
              :timestamp="item.date"
              placement="top"
            >
              <div class="timeline-card">
                <div class="card-top-bar">
                  <div class="timeline-tag">
                    <el-tag :type="item.tagType" size="small" round>{{ item.tag }}</el-tag>
                    <el-tag v-if="item.isRealtime" type="info" size="small" effect="light" round class="realtime-badge">
                      ⚡ 实时推送
                    </el-tag>
                  </div>
                  <a 
                    v-if="item.url" 
                    :href="item.url" 
                    target="_blank" 
                    class="bili-link-btn"
                  >
                    查看 B 站原动态 <el-icon><TopRight /></el-icon>
                  </a>
                </div>

                <h3 class="timeline-title" v-if="item.title && item.title !== item.content">
                  {{ item.title }}
                </h3>
                <p class="timeline-content">{{ item.content }}</p>

                <!-- 动态附带图片网络 -->
                <div class="dynamic-image-grid" v-if="item.images && item.images.length > 0">
                  <div 
                    v-for="(img, imgIdx) in item.images" 
                    :key="imgIdx" 
                    class="img-item"
                  >
                    <el-image 
                      :src="img" 
                      :preview-src-list="item.images"
                      :initial-index="imgIdx"
                      fit="cover"
                      loading="lazy"
                      preview-teleported
                    />
                  </div>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>

          <el-empty v-else description="由于 B 站接口限制，当前无法自动获取最新动态 ＞_＜" :image-size="80">
            <el-button type="primary" round @click="openBiliSpace">
              去 B 站个人主页查看最新动态
            </el-button>
          </el-empty>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { VideoCamera, Refresh, Link, ChatDotSquare, TopRight } from '@element-plus/icons-vue'
import { fetchLiveStatus, fetchUserDynamics } from '@/utils/bilibili'

const isLoading = ref(false)
const lastUpdated = ref('')
let timer = null

// 直播状态数据
const liveInfo = ref({
  isLive: false,
  title: '',
  online: 0,
  roomUrl: 'https://live.bilibili.com/21402309'
})

// 动态数据列表
const kanonNews = ref([])

// 严格限定展示最新的 5 条动态
const displayNews = computed(() => {
  return kanonNews.value.slice(0, 5)
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
    // 1. 获取直播开播状态
    const liveRes = await fetchLiveStatus()
    if (liveRes) {
      liveInfo.value = liveRes
    }

    // 2. 获取用户最新 B 站动态 (自动限制最多 5 条)
    const dynamicsRes = await fetchUserDynamics()
    if (dynamicsRes && Array.isArray(dynamicsRes) && dynamicsRes.length > 0) {
      kanonNews.value = dynamicsRes.slice(0, 5)
    }

    // 更新时间标记
    const now = new Date()
    lastUpdated.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
  } catch (err) {
    console.error('加载数据失败:', err)
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

/* 动态列表卡片容器 */
.box-card {
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--card-border, rgba(0, 0, 0, 0.08));
  border-radius: var(--radius-lg, 16px);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 24px;
}

.timeline-container {
  padding-top: 6px;
}

.timeline-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 12px;
  padding: 18px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.timeline-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}

.card-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.timeline-tag {
  display: flex;
  align-items: center;
  gap: 6px;
}

.realtime-badge {
  font-weight: 600;
}

.bili-link-btn {
  font-size: 12px;
  color: var(--primary-color, #ff7b9b);
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 2px;
  transition: opacity 0.2s ease;
}

.bili-link-btn:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.timeline-title {
  margin: 0 0 8px 0;
  color: var(--text-main);
  font-size: 15px;
  font-weight: 700;
  line-height: 1.4;
}

.timeline-content {
  margin: 0 0 12px 0;
  color: var(--text-regular);
  line-height: 1.6;
  font-size: 14px;
  white-space: pre-wrap;
  word-break: break-word;
}

/* 动态图片预览网络 */
.dynamic-image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 8px;
  margin-top: 10px;
}

.img-item {
  width: 100%;
  height: 110px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.img-item .el-image {
  width: 100%;
  height: 100%;
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
