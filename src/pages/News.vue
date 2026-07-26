<template>
  <div class="news-page">
    <div class="container">
      <h1 class="page-title">动态提醒</h1>
      <p class="subtitle">第一时间获取真白花音的动态直播提醒与本站最新更新记录 🔔</p>

      <!-- 悬浮时间轴导航 -->
      <div class="sticky-time-nav" v-if="availableYears.length > 0">
        <div class="nav-title">年份快速跳转</div>
        <div class="nav-years">
          <div 
            v-for="year in availableYears" 
            :key="year" 
            class="nav-item" 
            :class="{ active: currentYear === year }"
            @click="scrollToYear(year)"
          >
            {{ year }}年
          </div>
        </div>
      </div>

      <el-row :gutter="28">
        <!-- 左栏：真白花音的动态和直播提醒 -->
        <el-col :xs="24" :md="12">
          <div class="box-card">
            <div class="card-header">
              <div class="header-left">
                <el-icon class="header-icon pink"><VideoCamera /></el-icon>
                <span>真白花音 动态与直播提醒</span>
              </div>
              <el-button type="danger" size="small" round plain @click="openLive">
                <el-icon style="margin-right: 4px;"><VideoCamera /></el-icon>
                直播间 21402309
              </el-button>
            </div>

            <!-- 直播状态简报 -->
            <div class="live-status-box">
              <div class="status-badge-group">
                <span class="status-dot grey"></span>
                <span class="status-text">B站个人空间动态 & 历史直播预告</span>
              </div>
              <p class="live-tip">提示：如无法获取即时推送，可点击下方按钮直接跳转 B 站主页查看最新动态。</p>
              <el-button type="primary" size="small" round @click="openBiliSpace">
                <el-icon style="margin-right: 4px;"><ArrowRight /></el-icon>
                前往 B站 个人主页
              </el-button>
            </div>

            <!-- 动态与直播提醒列表 (有就填上，没有就展示空状态) -->
            <div class="timeline-container">
              <el-timeline v-if="kanonNews.length > 0">
                <el-timeline-item
                  v-for="(item, index) in kanonNews"
                  :key="index"
                  :type="item.type"
                  :timestamp="item.date"
                  placement="top"
                >
                  <div class="timeline-card" :data-year="item.date.substring(0, 4)">
                    <div class="timeline-tag">
                      <el-tag :type="item.tagType" size="small" round>{{ item.tag }}</el-tag>
                    </div>
                    <h3 class="timeline-title">{{ item.title }}</h3>
                    <p class="timeline-content">{{ item.content }}</p>
                  </div>
                </el-timeline-item>
              </el-timeline>

              <!-- 找不到动态时展示空状态 -->
              <el-empty v-else description="暂无更多动态提醒" :image-size="80" />
            </div>
          </div>
        </el-col>

        <!-- 右栏：网站的更新 -->
        <el-col :xs="24" :md="12">
          <div class="box-card">
            <div class="card-header">
              <div class="header-left">
                <el-icon class="header-icon green"><Refresh /></el-icon>
                <span>网站的更新</span>
              </div>
              <el-tag type="success" size="small" round>v0.1.2</el-tag>
            </div>

            <!-- 网站更新日志列表 -->
            <div class="timeline-container">
              <el-timeline v-if="siteNews.length > 0">
                <el-timeline-item
                  v-for="(item, index) in siteNews"
                  :key="index"
                  :type="item.type"
                  :timestamp="item.date"
                  placement="top"
                >
                  <div class="timeline-card site-card" :data-year="item.date.substring(0, 4)">
                    <div class="timeline-tag">
                      <el-tag :type="item.tagType" size="small" round>{{ item.tag }}</el-tag>
                    </div>
                    <h3 class="timeline-title">{{ item.title }}</h3>
                    <p class="timeline-content">{{ item.content }}</p>
                  </div>
                </el-timeline-item>
              </el-timeline>

              <el-empty v-else description="暂无网站更新记录" :image-size="80" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { VideoCamera, ArrowRight, Refresh } from '@element-plus/icons-vue'

const currentYear = ref(new Date().getFullYear().toString())

const scrollToYear = (year) => {
  currentYear.value = year
  const element = document.querySelector(`[data-year="${year}"]`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

// 一栏：真白花音的动态和直播提醒 (搜到即填，找不到可留空)
const kanonNews = ref([
  {
    date: '2026-05-01',
    title: '【毕业特别 Live】真白花音毕业 Live 直播提醒',
    content: '真白花音正式进行 Bilibili 毕业 Live 特别直播，感谢广大帕清姬长久以来的支持与陪伴。',
    tag: '直播提醒',
    tagType: 'danger',
    type: 'danger'
  },
  {
    date: '2025-06-21',
    title: '全新女仆形象发布会 Live',
    content: '画师：ana | 模型：梦野依依，全新精致女仆造型直播公开！',
    tag: '形象发布',
    tagType: 'warning',
    type: 'success'
  },
  {
    date: '2024-12-28',
    title: '3D 娃娃菜形象发布会直播',
    content: '全新 3D 娃娃菜模型登场，带来更生动活泼的直播陪伴体验。',
    tag: '3D发布',
    tagType: 'success',
    type: 'primary'
  }
])

// 另一栏：网站的更新
const siteNews = ref([
  {
    date: '2026-04-17',
    title: 'v0.1.2 移动端交互修复',
    content: '解决移动端轮播图左右滑动体验，优化顶部导航适配与图片资源依赖路径。',
    tag: 'v0.1.2',
    tagType: 'success',
    type: 'success'
  },
  {
    date: '2026-04-17',
    title: 'v0.1.1 导航与布局优化',
    content: '优化导航栏呈现效果，新增「小游戏」「动态提醒」栏目，提升多端联动交互。',
    tag: 'v0.1.1',
    tagType: 'warning',
    type: 'warning'
  },
  {
    date: '2026-04-15',
    title: 'v0.1.0 内容完善与修正',
    content: '清理冗余内容与视频跳转，调整代表作品排序及图片展示，修正页面细节文案。',
    tag: 'v0.1.0',
    tagType: 'primary',
    type: 'primary'
  },
  {
    date: '2026-04-15',
    title: '眞白花音粉丝纪念网站上线',
    content: '提供个人资料、作品列表、游玩的工程游戏以及经典名场面语录收集。',
    tag: '站点上线',
    tagType: 'info',
    type: 'info'
  }
])

const availableYears = computed(() => {
  const years = new Set()
  kanonNews.value.forEach(item => years.add(item.date.substring(0, 4)))
  siteNews.value.forEach(item => years.add(item.date.substring(0, 4)))
  return Array.from(years).sort((a, b) => b - a)
})

const openBiliSpace = () => {
  window.open('https://space.bilibili.com/401480763', '_blank')
}

const openLive = () => {
  window.open('https://live.bilibili.com/21402309/', '_blank')
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.subtitle {
  text-align: center;
  color: var(--text-secondary);
  font-size: 15px;
  margin-top: -24px;
  margin-bottom: 20px;
}

.sticky-time-nav {
  position: sticky;
  top: 84px;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 12px 24px;
  border-radius: var(--radius-full, 9999px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  margin: 0 auto 32px;
  width: max-content;
  border: 1px solid rgba(255, 123, 155, 0.2);
}

.nav-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-main);
  margin-right: 8px;
}

.nav-years {
  display: flex;
  gap: 8px;
}

.nav-item {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-regular);
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(0, 0, 0, 0.04);
}

.nav-item:hover {
  background: rgba(255, 123, 155, 0.1);
  color: var(--primary-color);
}

.nav-item.active {
  background: var(--primary-color);
  color: #fff;
  box-shadow: 0 2px 8px rgba(255, 123, 155, 0.3);
}

.box-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 24px;
  height: calc(100% - 24px);
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 16px;
  color: var(--text-main);
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-icon {
  font-size: 18px;
}

.header-icon.pink {
  color: var(--primary-color);
}

.header-icon.green {
  color: var(--secondary-color);
}

.live-status-box {
  background: rgba(255, 123, 155, 0.04);
  border: 1px dashed rgba(255, 123, 155, 0.2);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  margin-bottom: 20px;
}

.status-badge-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-dot.grey {
  background-color: #94a3b8;
}

.status-text {
  font-weight: 600;
  font-size: 13px;
  color: var(--text-main);
}

.live-tip {
  font-size: 12px;
  color: var(--text-secondary);
  margin: 0 0 10px 0;
  line-height: 1.5;
}

.timeline-container {
  padding-top: 6px;
  flex: 1;
}

.timeline-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: var(--radius-md);
  padding: 16px 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.timeline-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.site-card {
  border-left: 3px solid var(--secondary-color);
}

.timeline-tag {
  margin-bottom: 6px;
}

.timeline-title {
  margin: 0 0 6px 0;
  color: var(--text-main);
  font-size: 15px;
  font-weight: 700;
}

.timeline-content {
  margin: 0;
  color: var(--text-regular);
  line-height: 1.6;
  font-size: 13px;
}
</style>
