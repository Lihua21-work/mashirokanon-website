<template>
  <div class="home">
    <!-- 轮播图 -->
    <Carousel />
    
    <!-- 简介部分 -->
    <div class="container">
      <el-row :gutter="20" class="intro-section">
        <el-col :xs="24" :md="12">
          <div class="intro-card">
            <h2>关于眞白花音</h2>
            <p>
              眞白花音（ましろ かのん / Mashiro Kanon），是一名从2020年4月开始活动的个人势虚拟VUP。
              她来自日本，拥有流利的中文能力，被粉丝们亲切地称为"白菜"。
            </p>
            <p>
              她的直播内容丰富多样，包括游戏直播、杂谈、唱歌等，以可爱的形象和有趣的性格深受观众喜爱。
            </p>
            <div class="button-group">
              <el-button type="primary" @click="goToProfile">查看更多资料</el-button>
              <el-button type="success" @click="goToBilibili">B站主页</el-button>
              <el-button type="warning" @click="goToLive">进入直播间</el-button>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :md="12">
          <div class="intro-image">
            <img src="@/assets/images/home.jpg" alt="眞白花音" />
          </div>
        </el-col>
      </el-row>
      
      <!-- 特色部分 -->
      <div class="features-section">
        <h2 class="section-title">她的特色</h2>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="6">
            <el-card class="feature-card">
              <template #header>
                <div class="card-header">
                  <span>中文（菜语）十级</span>
                </div>
              </template>
              <p>拥有流利的中文能力，能够用中文进行直播和交流</p>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-card class="feature-card">
              <template #header>
                <div class="card-header">
                  <span>可爱形象</span>
                </div>
              </template>
              <p>以可爱的虚拟形象和甜美的声音深受粉丝喜爱</p>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-card class="feature-card">
              <template #header>
                <div class="card-header">
                  <span>多才多艺</span>
                </div>
              </template>
              <p>擅长唱歌、游戏、杂谈等多种直播内容</p>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-card class="feature-card">
              <template #header>
                <div class="card-header">
                  <span>性格开朗</span>
                </div>
              </template>
              <p>性格开朗活泼，直播氛围轻松愉快</p>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup>
// 引入路由和轮播图组件
import { useRouter } from 'vue-router'
import Carousel from '@/components/Carousel.vue'

// 获取路由对象
const router = useRouter()

// 跳转到资料页
const goToProfile = () => {
  router.push('/profile')
}

// 跳转到B站主页
const goToBilibili = () => {
  window.open('https://space.bilibili.com/401480763', '_blank')
}

// 跳转到直播间
const goToLive = () => {
  window.open('https://live.bilibili.com/21402309/', '_blank')
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.intro-section {
  margin-bottom: 80px;
}

.intro-card {
  padding: 20px;
}

.intro-card h2 {
  margin-bottom: 20px;
  color: #333;
}

.intro-card p {
  line-height: 1.8;
  color: #666;
  margin-bottom: 20px;
}

/* 按钮组样式：电脑端正常布局 */
.button-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

/* 手机端：强制一行、紧凑缩小、不换行 */
@media (max-width: 768px) {
  .button-group {
    flex-wrap: nowrap;
    gap: 6px;
    justify-content: center;
  }
  .button-group .el-button {
    padding: 8px 10px;
    font-size: 13px;
    flex: 1;
    min-width: 0;
  }
}

.intro-image img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
}

.feature-card {
  margin-bottom: 20px;
  text-align: center;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-header {
  font-weight: 600;
  font-size: 16px;
}
</style>