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
                  <p>{{ song.artist }}</p>
                  <el-button type="primary" size="small" link @click="openVideo(song.url)">查看视频</el-button>
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
                  <p>{{ song.artist }}</p>
                  <el-button type="primary" size="small" link @click="openVideo(song.url)">查看视频</el-button>
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

// 统一打开视频的函数
const openVideo = (url) => {
  window.open(url, '_blank')
}

// 翻唱歌曲（纯本地图片+真实B站链接）
const coverSongs = [
  {
    id: 1,
    title: '《稻香》',
    artist: '翻唱：眞白花音',
    cover: new URL('@/assets/images/daoxiang.jpg', import.meta.url).href,
    url: 'https://www.bilibili.com/video/BV1j1421o7Qj/'
  },
  {
    id: 2,
    title: '《Happy Halloween》',
    artist: '翻唱：眞白花音',
    cover: new URL('@/assets/images/halloween.jpg', import.meta.url).href,
    url: 'https://www.bilibili.com/video/BV1Qb421o7QH/'
  },
  {
    id: 3,
    title: '《Sparkle》',
    artist: '翻唱：眞白花音',
    cover: new URL('@/assets/images/sparkle.jpg', import.meta.url).href,
    url: 'https://www.bilibili.com/video/BV1Qm411o7Q9/'
  }
]

// 原创歌曲（占位）
const originalSongs = [
  {
    id: 1,
    title: '《白菜之歌》',
    artist: '演唱：眞白花音',
    cover: 'https://picsum.photos/id/1021/300/200',
    url: 'https://www.bilibili.com/video/BV1xx411c7mA'
  },
  {
    id: 2,
    title: '《帕清姬之歌》',
    artist: '演唱：眞白花音',
    cover: 'https://picsum.photos/id/1022/300/200',
    url: 'https://www.bilibili.com/video/BV1xx411c7mB'
  },
  {
    id: 3,
    title: '《菜语十级》',
    artist: '演唱：眞白花音',
    cover: 'https://picsum.photos/id/1023/300/200',
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
}

.work-info h3 {
  margin-bottom: 10px;
  color: #333;
  font-size: 16px;
}

.work-info p {
  color: #666;
  margin-bottom: 10px;
}
</style>