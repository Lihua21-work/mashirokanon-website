<template>
  <el-carousel
    ref="carouselRef"
    height="500px"
    :autoplay="true"
    :interval="4000"
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
        <div class="carousel-text">
          <h2>{{ item.title }}</h2>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ✅ 修复：Vite 标准路径写法（开发/打包/手机全适配）
const bannerList = ref([
  { img: new URL('@/assets/images/banner1.jpg', import.meta.url).href, title: '新形象', desc: "2022年5月29日 | 画师：ana | 模型：涵涵" },
  { img: new URL('@/assets/images/banner2.jpg', import.meta.url).href, title: '3D形象', desc: "2022年11月13日 | 模型：uron" },
  { img: new URL('@/assets/images/banner3.jpg', import.meta.url).href, title: '私服形象', desc: "2023年5月29日 | 画师：ana | 模型：涵涵" },
  { img: new URL('@/assets/images/banner4.jpg', import.meta.url).href, title: 'Q版形象', desc: "2023年9月2日 | 画师：ニャドラ | 模型：Miggy" },
  { img: new URL('@/assets/images/banner5.jpg', import.meta.url).href, title: '三周年纪念3D形象', desc: "2023年12月16日 | 画师：ana | 模型：uron" },
  { img: new URL('@/assets/images/banner6.jpg', import.meta.url).href, title: '汉服形象', desc: "2024年2月12日 | 画师：CAROTA、ana | 模型：Miggy" },
  { img: new URL('@/assets/images/banner7.jpg', import.meta.url).href, title: 'Q版洛丽塔', desc: "2024年6月8日 | 画师：ニャドラ | 模型：Miggy" },
  { img: new URL('@/assets/images/banner8.jpg', import.meta.url).href, title: '制服形象', desc: "2024年10月26日 | 画师：ana | 模型：梦野依依" },
  { img: new URL('@/assets/images/banner9.jpg', import.meta.url).href, title: '3D娃娃菜', desc: "2024年12月28日 | 模型：Rぷりん、ぬこ" },
  { img: new URL('@/assets/images/banner10.jpg', import.meta.url).href, title: '女仆形象', desc: "2025年6月21日 | 画师：ana | 模型：梦野依依" },
])

const isMobile = ref(false)
const carouselRef = ref(null)
const startX = ref(0)
const startY = ref(0)
const touchMoveX = ref(0)
const isHorizontalSwipe = ref(false)

// 检查屏幕尺寸
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// 触摸事件处理 - 解决手机滑动失效
const handleTouchStart = (e) => {
  startX.value = e.touches[0].clientX
  startY.value = e.touches[0].clientY
  isHorizontalSwipe.value = false
}

const handleTouchMove = (e) => {
  const dx = e.touches[0].clientX - startX.value
  const dy = e.touches[0].clientY - startY.value
  
  // 判断是否为水平滑动
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
    isHorizontalSwipe.value = true
    e.preventDefault() // 阻止页面滚动，确保轮播滑动正常
    touchMoveX.value = dx
  }
}

const handleTouchEnd = () => {
  if (isHorizontalSwipe.value) {
    const threshold = 50 // 滑动阈值
    if (touchMoveX.value > threshold) {
      carouselRef.value.prev() // 右滑，上一页
    } else if (touchMoveX.value < -threshold) {
      carouselRef.value.next() // 左滑，下一页
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
.carousel-item {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: pan-y; /* 允许垂直滚动，阻止水平默认行为 */
}

.carousel-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.carousel-text {
  position: absolute;
  bottom: 60px;
  left: 50px;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
}

.carousel-text h2 {
  font-size: 40px;
  margin-bottom: 12px;
  font-weight: 600;
}

.carousel-text p {
  font-size: 20px;
}

/* 手机端适配 */
@media (max-width: 768px) {
  :deep(.el-carousel) {
    height: 380px !important;
  }
  .carousel-text {
    left: 20px;
    bottom: 40px;
  }
  .carousel-text h2 {
    font-size: 28px;
  }
  .carousel-text p {
    font-size: 14px;
  }
}
</style>