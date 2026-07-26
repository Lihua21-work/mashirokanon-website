<template>
  <div class="works-page">
    <div class="container">
      <h1 class="page-title">代表作品</h1>
      
      <div class="tabs-wrapper">
        <el-tabs v-model="activeTab" class="custom-tabs">
          <el-tab-pane label="🎤 热门翻唱" name="covers">
            <el-row :gutter="24">
              <el-col :xs="24" :sm="12" :md="8" v-for="song in coverSongs" :key="song.id">
                <div class="work-card">
                  <div class="cover-wrapper">
                    <img :src="song.cover" class="work-cover" :alt="song.title" />
                    <div class="cover-overlay">
                      <div class="play-icon">▶</div>
                    </div>
                    <div class="category-badge">翻唱作品</div>
                  </div>
                  <div class="work-info">
                    <h3 class="work-title">{{ song.title }}</h3>
                    <p class="work-sub">Mashiro Kanon Cover</p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          
          <el-tab-pane label="✨ 原创金曲" name="originals">
            <el-row :gutter="24">
              <el-col :xs="24" :sm="12" :md="8" v-for="song in originalSongs" :key="song.id">
                <div class="work-card">
                  <div class="cover-wrapper">
                    <img :src="song.cover" class="work-cover" :alt="song.title" />
                    <div class="cover-overlay">
                      <div class="play-icon">▶</div>
                    </div>
                    <div class="category-badge original">原创单曲</div>
                  </div>
                  <div class="work-info">
                    <h3 class="work-title">{{ song.title }}</h3>
                    <p class="work-sub">Original Song</p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('covers')

const coverSongs = [
  {
    id: 1,
    title: '《Sparkle》',
    cover: new URL('@/assets/images/sparkle.jpg', import.meta.url).href
  },
  {
    id: 2,
    title: '《稻香》',
    cover: new URL('@/assets/images/daoxiang.jpg', import.meta.url).href
  },
  {
    id: 3,
    title: '《Happy Halloween》',
    cover: new URL('@/assets/images/halloween.jpg', import.meta.url).href
  }
]

const originalSongs = [
  {
    id: 1,
    title: '《恋爱模拟！ABC！》',
    cover: new URL('@/assets/images/loveabc.jpg', import.meta.url).href
  },
  {
    id: 2,
    title: '《闪闪循环》',
    cover: new URL('@/assets/images/kuishou.jpg', import.meta.url).href
  },
  {
    id: 3,
    title: '《可以称为你的推吗？》',
    cover: new URL('@/assets/images/oshitekuremasuka.jpg', import.meta.url).href
  }
]
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.custom-tabs :deep(.el-tabs__nav-wrap::after) {
  display: none;
}

.custom-tabs :deep(.el-tabs__nav) {
  float: none;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.custom-tabs :deep(.el-tabs__item) {
  font-size: 16px;
  font-weight: 600;
  padding: 0 24px;
  height: 44px;
  line-height: 44px;
  color: var(--text-regular);
  transition: all 0.3s ease;
}

.custom-tabs :deep(.el-tabs__item.is-active) {
  color: var(--primary-color);
  font-size: 17px;
}

.custom-tabs :deep(.el-tabs__active-bar) {
  background-color: var(--primary-color);
  height: 3px;
  border-radius: 2px;
}

.work-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.work-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-md);
  border-color: rgba(255, 123, 155, 0.3);
}

.cover-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f1f5f9;
}

.work-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.work-card:hover .work-cover {
  transform: scale(1.06);
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.work-card:hover .cover-overlay {
  opacity: 1;
}

.play-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  padding-left: 3px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transform: scale(0.8);
  transition: transform 0.3s ease;
}

.work-card:hover .play-icon {
  transform: scale(1);
}

.category-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 123, 155, 0.85);
  backdrop-filter: blur(4px);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 12px;
}

.category-badge.original {
  background: rgba(54, 211, 153, 0.85);
}

.work-info {
  padding: 16px 20px;
  text-align: center;
}

.work-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 6px 0;
}

.work-sub {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
}
</style>