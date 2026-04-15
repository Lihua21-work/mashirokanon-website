<template>
  <div class="works">
    <div class="container">
      <h1 class="page-title">代表作品</h1>
      
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="翻唱歌曲" name="covers">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="8" v-for="song in coverSongs" :key="song.id">
              <el-card class="work-card" :body-style="{ padding: 0 }">
                <img :src="song.cover" class="work-cover" :alt="song.title" />
                <div class="work-info">
                  <h3>{{ song.title }}</h3>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        
        <el-tab-pane label="原创歌曲" name="originals">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="8" v-for="song in originalSongs" :key="song.id">
              <el-card class="work-card" :body-style="{ padding: 0 }">
                <img :src="song.cover" class="work-cover" :alt="song.title" />
                <div class="work-info">
                  <h3>{{ song.title }}</h3>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('covers')

// 翻唱歌曲（顺序：Sparkle → 稻香 → Happy Halloween）
const coverSongs = [
  {
    id: 1,
    title: '《Sparkle》',
    cover: new URL('@/assets/images/sparkle.jpg', import.meta.url).href,
    url: 'https://www.bilibili.com/video/BV1Qm411o7Q9/'
  },
  {
    id: 2,
    title: '《稻香》',
    cover: new URL('@/assets/images/daoxiang.jpg', import.meta.url).href,
    url: 'https://www.bilibili.com/video/BV1j1421o7Qj/'
  },
  {
    id: 3,
    title: '《Happy Halloween》',
    cover: new URL('@/assets/images/halloween.jpg', import.meta.url).href,
    url: 'https://www.bilibili.com/video/BV1Qb421o7QH/'
  }
]

// 原创歌曲（顺序不变，保持本地图片）
const originalSongs = [
  {
    id: 1,
    title: '《恋爱模拟！ABC！》',
    cover: new URL('@/assets/images/loveabc.jpg', import.meta.url).href,
    url: 'https://www.bilibili.com/video/BV1xx411c7mA'
  },
  {
    id: 2,
    title: '《闪闪循环》',
    cover: new URL('@/assets/images/kuishou.jpg', import.meta.url).href,
    url: 'https://www.bilibili.com/video/BV1xx411c7mB'
  },
  {
    id: 3,
    title: '《可以称为你的推吗？》',
    cover: new URL('@/assets/images/oshitekuremasuka.jpg', import.meta.url).href,
    url: 'https://www.bilibili.com/video/BV1xx411c7mC'
  }
]
</script>

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

.work-card {
  margin-bottom: 20px;
  transition: transform 0.3s;
}

.work-card:hover {
  transform: translateY(-5px);
}

.work-cover {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
}

.work-info {
  padding: 15px;
  text-align: center;
}

.work-info h3 {
  margin: 0;
  color: #333;
  font-size: 16px;
}
</style>