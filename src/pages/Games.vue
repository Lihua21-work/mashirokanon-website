<template>
  <div class="games-page">
    <div class="container">
      <h1 class="page-title">解压小游戏</h1>

      <el-row :gutter="24" justify="center">
        <el-col :xs="24" :sm="20" :md="14">
          <!-- 功德/白菜计数器 -->
          <div class="game-card">
            <div class="card-header">
              <span class="game-title">🥬 电子敲白菜</span>
              <div class="count-badge">
                功德数 <span class="count-num">{{ count }}</span>
              </div>
            </div>

            <!-- 敲击互动区域 -->
            <div class="cabbage-stage" @click="handleCabbageClick">
              <!-- 飘浮粒子队列 -->
              <div 
                v-for="particle in particles" 
                :key="particle.id" 
                class="particle"
                :style="{ left: particle.x + 'px', top: particle.y + 'px' }"
              >
                {{ particle.text }}
              </div>

              <div class="cabbage-icon" :class="{ animate: isAnimate }">
                🥬
              </div>
              <p class="click-tip">点击白菜积累功德，守护花音！✨</p>
              <p class="level-title">当前称号：<span class="highlight-title">{{ getTitle(count) }}</span></p>
            </div>

            <div class="game-actions">
              <el-button type="warning" size="large" round @click="drawFortune">
                🔮 抽今日花音运势签
              </el-button>
              <el-button type="info" text @click="resetCount">重置计数</el-button>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 抽签结果对话框 -->
      <el-dialog v-model="showFortune" title="🌸 今日花音运势签" width="90%" max-width="480px" class="fortune-dialog" center rounded>
        <div class="fortune-card-box">
          <div class="fortune-level" :style="{ color: currentFortune.color }">
            {{ currentFortune.level }}
          </div>
          <p class="fortune-desc">{{ currentFortune.desc }}</p>
          <div class="fortune-divider"></div>
          <div class="fortune-tip-box">
            <span class="tip-label">💡 守护建议：</span>
            <span class="tip-text">{{ currentFortune.tip }}</span>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const count = ref(parseInt(localStorage.getItem('kanon_cabbage_count') || '0'))
const isAnimate = ref(false)
const showFortune = ref(false)
const currentFortune = ref({})

// 点击飘飞文字粒子
const particles = ref([])
let particleId = 0

const fortunes = [
  { level: '大吉 🌟', color: '#ff7b9b', desc: '今天看花音直播会触发超级好运，欧皇附体！', tip: '在直播间发送一条“花音可爱”弹幕' },
  { level: '中吉 🌸', color: '#36d399', desc: '今天你的心愿会被白菜女神听到，顺风顺水。', tip: '重温一遍《Sparkle》翻唱视频' },
  { level: '小吉 🍀', color: '#e6a23c', desc: '今天是平淡而温暖的一天，适合听歌放松。', tip: '在粉丝站点击白菜 10 次积攒好运' },
  { level: '末吉 🥬', color: '#909399', desc: '注意保持好心情，白菜会一直陪着你。', tip: '给花音最新的 B 站动态点个赞' }
]

const getTitle = (c) => {
  if (c >= 500) return '尊贵白菜仙人 👑'
  if (c >= 200) return '功德无量白菜王 🌟'
  if (c >= 50) return '资深白菜守护者 🥬'
  if (c >= 10) return '热心帕清姬 🌸'
  return '实习敲菜人 🌱'
}

const handleCabbageClick = (e) => {
  count.value++
  localStorage.setItem('kanon_cabbage_count', count.value.toString())
  
  // 图标动画
  isAnimate.value = true
  setTimeout(() => {
    isAnimate.value = false
  }, 150)

  // 生成浮动粒子
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left - 20
  const y = e.clientY - rect.top - 20

  const texts = ['功德+1', '🥬+1', '好运+1', '功德+1', '白菜+1']
  const randomText = texts[Math.floor(Math.random() * texts.length)]

  const pid = ++particleId
  particles.value.push({ id: pid, x, y, text: randomText })

  setTimeout(() => {
    particles.value = particles.value.filter(p => p.id !== pid)
  }, 800)

  if (count.value > 0 && count.value % 50 === 0) {
    ElMessage.success({
      message: `🎉 太棒了！已累计守护白菜 ${count.value} 次！获得称号：${getTitle(count.value)}`,
      offset: 70
    })
  }
}

const drawFortune = () => {
  const randomIndex = Math.floor(Math.random() * fortunes.length)
  currentFortune.value = fortunes[randomIndex]
  showFortune.value = true
}

const resetCount = () => {
  count.value = 0
  localStorage.setItem('kanon_cabbage_count', '0')
  ElMessage.info('计数已归零')
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.game-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: 32px 24px;
  box-shadow: var(--shadow-sm);
  text-align: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.game-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-main);
}

.count-badge {
  background: var(--primary-light);
  color: var(--primary-color);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.count-num {
  font-size: 18px;
  font-weight: 800;
}

.cabbage-stage {
  position: relative;
  padding: 40px 0;
  cursor: pointer;
  user-select: none;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.6);
  border: 2px dashed rgba(255, 123, 155, 0.2);
  transition: background 0.3s ease;
  overflow: hidden;
}

.cabbage-stage:hover {
  background: rgba(255, 255, 255, 0.9);
}

.cabbage-icon {
  font-size: 100px;
  transition: transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: inline-block;
}

.cabbage-icon.animate {
  transform: scale(1.3) rotate(-12deg);
}

.click-tip {
  margin-top: 16px;
  color: var(--text-regular);
  font-size: 15px;
  font-weight: 500;
}

.level-title {
  margin-top: 8px;
  font-size: 14px;
  color: var(--text-secondary);
}

.highlight-title {
  color: var(--primary-color);
  font-weight: 700;
}

/* 粒子浮动动画 */
.particle {
  position: absolute;
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-color);
  pointer-events: none;
  animation: floatUp 0.8s ease-out forwards;
  z-index: 10;
  text-shadow: 0 2px 6px rgba(255, 255, 255, 0.9);
}

@keyframes floatUp {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px) scale(1.2);
  }
}

.game-actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 28px;
  gap: 12px;
}

.fortune-card-box {
  text-align: center;
  padding: 20px 10px;
}

.fortune-level {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 12px;
}

.fortune-desc {
  font-size: 16px;
  color: var(--text-main);
  line-height: 1.6;
}

.fortune-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin: 20px 0;
}

.fortune-tip-box {
  background: var(--bg-page);
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  color: var(--text-regular);
  text-align: left;
}

.tip-label {
  font-weight: 600;
  color: var(--text-main);
}
</style>
