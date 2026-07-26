<template>
  <div class="carousel-container">
    <el-carousel
      ref="carouselRef"
      height="480px"
      :autoplay="true"
      :interval="4500"
      indicator-position="outside"
      :arrow="isMobile ? 'never' : 'hover'"
      :touchable="true"
      loop
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <el-carousel-item v-for="(item, index) in bannerList" :key="index">
        <div class="carousel-item">
          <img :src="item.img" :alt="item.title" class="carousel-image" />
          <div class="carousel-overlay"></div>
          <div class="carousel-text-box">
            <div class="carousel-badge">形象展示</div>
            <h2 class="carousel-title">{{ item.title }}</h2>
            <p class="carousel-desc">{{ item.desc }}</p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const bannerList = ref([
  { img: new URL('@/assets/images/banner1.jpg', import.meta.url).href, title: '新形象', desc: "2022年5月29日 | 画师：ana | 模型：涵涵" },
  { img: new URL('@/assets/images/banner2_trans.png', import.meta.url).href, title: '3D形象', desc: "2022年11月13日 | 模型：uron" },
  { img: new URL('@/assets/images/banner3.jpg', import.meta.url).href, title: '私服形象', desc: "2023年5月29日 | 画师：ana | 模型：涵涵" },
  { img: new URL('@/assets/images/banner4_trans.png', import.meta.url).href, title: 'Q版形象', desc: "2023年9月2日 | 画师：ニャドラ | 模型：Miggy" },
  { img: new URL('@/assets/images/banner5_trans.png', import.meta.url).href, title: '三周年纪念3D形象', desc: "2023年12月16日 | 画师：ana | 模型：uron" },
  { img: new URL('@/assets/images/banner6.jpg', import.meta.url).href, title: '汉服形象', desc: "2024年2月12日 | 画师：CAROTA、ana | 模型：Miggy" },
  { img: new URL('@/assets/images/banner7.jpg', import.meta.url).href, title: 'Q版洛丽塔', desc: "2024年6月8日 | 画师：ニャドラ | 模型：Miggy" },
  { img: new URL('@/assets/images/banner8.jpg', import.meta.url).href, title: '制服形象', desc: "2024年10月26日 | 画师：ana | 模型：梦野依依" },
  { img: new URL('@/assets/images/banner9_trans.png', import.meta.url).href, title: '3D娃娃菜', desc: "2024年12月28日 | 模型：Rぷりん、ぬこ" },
  { img: new URL('@/assets/images/banner10.jpg', import.meta.url).href, title: '女仆形象', desc: "2025年6月21日 | 画师：ana | 模型：梦野依依" },
])

const isMobile = ref(false)
const carouselRef = ref(null)
const startX = ref(0)
const startY = ref(0)
const touchMoveX = ref(0)
const isHorizontalSwipe = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const handleTouchStart = (e) => {
  startX.value = e.touches[0].clientX
  startY.value = e.touches[0].clientY
  isHorizontalSwipe.value = false
}

const handleTouchMove = (e) => {
  const dx = e.touches[0].clientX - startX.value
  const dy = e.touches[0].clientY - startY.value
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
    isHorizontalSwipe.value = true
    e.preventDefault()
    touchMoveX.value = dx
  }
}

const handleTouchEnd = () => {
  if (isHorizontalSwipe.value) {
    const threshold = 50
    if (touchMoveX.value > threshold) {
      carouselRef.value.prev()
    } else if (touchMoveX.value < -threshold) {
      carouselRef.value.next()
    }
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener("resize", checkMobile)
})

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile)
})
</script>

<style scoped>
.carousel-container {
  max-width: 1200px;
  margin: 20px auto 0;
  padding: 0 20px;
}

:deep(.el-carousel) {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(44, 62, 80, 0.1);
}

.carousel-item {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #0f172a;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

.carousel-item:hover .carousel-image {
  transform: scale(1.02);
}

.carousel-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.1) 60%, transparent 100%);
  pointer-events: none;
}

.carousel-text-box {
  position: absolute;
  bottom: 40px;
  left: 40px;
  right: 40px;
  color: #ffffff;
  z-index: 2;
}

.carousel-badge {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255, 123, 155, 0.85);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.carousel-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.5px;
}

.carousel-desc {
  font-size: 15px;
  opacity: 0.9;
  margin: 0;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
}

:deep(.el-carousel__indicators--outside) {
  margin-top: 12px;
}

:deep(.el-carousel__button) {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #cbd5e1;
  opacity: 0.7;
  transition: all 0.3s ease;
}

:deep(.el-carousel__indicator.is-active .el-carousel__button) {
  width: 24px;
  border-radius: 6px;
  background-color: var(--primary-color);
  opacity: 1;
}

@media (max-width: 768px) {
  .carousel-container {
    padding: 0 12px;
    margin-top: 12px;
  }
  :deep(.el-carousel) {
    height: 340px !important;
  }
  .carousel-text-box {
    left: 20px;
    right: 20px;
    bottom: 24px;
  }
  .carousel-title {
    font-size: 22px;
  }
  .carousel-desc {
    font-size: 13px;
  }
}
</style>