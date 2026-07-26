<template>
  <div class="home-page">
    <!-- 轮播图 -->
    <Carousel />
    
    <!-- 内容容器 -->
    <div class="container">
      <!-- 简介部分 -->
      <section class="intro-section">
        <el-row :gutter="32" align="middle">
          <el-col :xs="24" :md="13">
            <div class="intro-content">
              <div class="intro-tag">
                <el-tag effect="light" type="primary" round>虚拟 VUP · 个人势</el-tag>
                <el-tag effect="light" type="success" round>B站知名主播</el-tag>
              </div>
              <h1 class="intro-title">
                你好，我是 <span class="highlight">眞白花音</span> 🥬
              </h1>
              <p class="intro-text">
                眞白花音（ましろ かのん / Mashiro Kanon），是一名从 2020 年 4 月开始活动的个人势虚拟 VUP。
                来自日本的她，拥有惊人的中文听说能力，凭借可爱的口音与真诚的交流被粉丝们亲切地称为<b>“白菜”</b>。
              </p>
              <p class="intro-subtext">
                她的直播充满了欢声笑语，无论是动听的歌声、快乐的游戏时光，还是接地气的汉字杂谈，都带给大家无限的温暖与治愈。
              </p>

              <div class="button-group">
                <el-button type="primary" size="large" round @click="goToProfile">
                  <el-icon style="margin-right: 6px;"><User /></el-icon>
                  查看完整资料
                </el-button>
                <el-button type="success" size="large" round @click="goToBilibili">
                  <el-icon style="margin-right: 6px;"><Star /></el-icon>
                  B站个人主页
                </el-button>
                <el-button type="warning" size="large" round @click="goToLive">
                  <el-icon style="margin-right: 6px;"><VideoCamera /></el-icon>
                  进入直播间
                </el-button>
              </div>
            </div>
          </el-col>

          <el-col :xs="24" :md="11">
            <div class="intro-image-wrapper">
              <div class="image-frame">
                <img src="@/assets/images/home.jpg" alt="眞白花音" class="intro-image" />
              </div>
              <div class="image-floating-badge">
                <span class="badge-icon">💖</span>
                <span class="badge-text">粉丝守护中</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </section>
      
      <!-- 特色亮点部分 -->
      <section class="features-section">
        <h2 class="section-title">她的魅力特色</h2>
        <p class="section-subtitle">陪伴每一位帕清姬度过温暖时光</p>

        <el-row :gutter="24">
          <el-col :xs="24" :sm="12" :md="6" v-for="(feat, index) in features" :key="index">
            <div class="feature-card">
              <div class="feature-icon-box" :style="{ background: feat.bg }">
                <span class="feature-emoji">{{ feat.emoji }}</span>
              </div>
              <h3 class="feature-card-title">{{ feat.title }}</h3>
              <p class="feature-card-desc">{{ feat.desc }}</p>
            </div>
          </el-col>
        </el-row>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { User, Star, VideoCamera } from '@element-plus/icons-vue'
import Carousel from '@/components/Carousel.vue'

const router = useRouter()

const features = [
  {
    emoji: '🗣️',
    bg: 'linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)',
    title: '中文（菜语）十级',
    desc: '具备优秀的中文听说交流能力，能无障碍与中国观众互动吐槽'
  },
  {
    emoji: '🌸',
    bg: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
    title: '极其可爱的形象',
    desc: '拥有多套精致可爱的 Live2D & 3D 形象，甜美音色治愈满满'
  },
  {
    emoji: '🎤',
    bg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
    title: '多才多艺歌姬',
    desc: '精通日文、中文流行曲与经典动漫歌，演唱极具感染力'
  },
  {
    emoji: '☀️',
    bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    title: '开朗温暖性格',
    desc: '性格活泼真实、待人真诚，直播间氛围轻松和谐充满能量'
  }
]

const goToProfile = () => {
  router.push('/profile')
}

const goToBilibili = () => {
  window.open('https://space.bilibili.com/401480763', '_blank')
}

const goToLive = () => {
  window.open('https://live.bilibili.com/21402309/', '_blank')
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.intro-section {
  margin-top: 20px;
  margin-bottom: 70px;
}

.intro-tag {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.intro-title {
  font-size: 38px;
  font-weight: 800;
  color: var(--text-main);
  margin: 0 0 20px 0;
  line-height: 1.2;
}

.intro-title .highlight {
  background: linear-gradient(135deg, #ff7b9b 0%, #36d399 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.intro-text {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-regular);
  margin-bottom: 14px;
}

.intro-subtext {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 30px;
}

.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.intro-image-wrapper {
  position: relative;
  margin-top: 20px;
}

.image-frame {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 16px 36px rgba(255, 123, 155, 0.15);
  border: 4px solid #ffffff;
  transition: transform 0.4s ease;
}

.image-frame:hover {
  transform: translateY(-4px);
}

.intro-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.image-floating-badge {
  position: absolute;
  bottom: -15px;
  right: -15px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 8px 18px;
  border-radius: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(255, 123, 155, 0.2);
  font-weight: 600;
  font-size: 14px;
  color: var(--text-main);
}

/* 特色部分 */
.features-section {
  padding-top: 20px;
}

.section-title {
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 8px;
}

.section-subtitle {
  text-align: center;
  font-size: 15px;
  color: var(--text-secondary);
  margin-bottom: 40px;
}

.feature-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 28px 20px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-bottom: 24px;
  height: calc(100% - 24px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(255, 123, 155, 0.12);
  border-color: rgba(255, 123, 155, 0.3);
}

.feature-icon-box {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}

.feature-emoji {
  font-size: 30px;
}

.feature-card-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 10px 0;
}

.feature-card-desc {
  font-size: 14px;
  color: var(--text-regular);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .intro-title {
    font-size: 28px;
  }
  .button-group {
    flex-direction: column;
  }
  .button-group .el-button {
    width: 100%;
  }
  .image-floating-badge {
    right: 10px;
    bottom: -10px;
  }
}
</style>