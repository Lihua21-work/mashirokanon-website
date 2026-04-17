<template>
  <el-carousel
    height="500px"
    :autoplay="true"
    :interval="4000"
    indicator-position="outside"
    :arrow="isMobile ? 'never' : 'hover'"
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
import { ref, onMounted } from 'vue'

// 轮播数据统一管理
const bannerList = ref([
  { img: new URL('@/assets/images/banner1.jpg', import.meta.url).href, title: '新形象', desc: '2022年5月29日 | 画师：ana | 模型：涵涵' },
  { img: new URL('@/assets/images/banner2.jpg', import.meta.url).href, title: '3D形象', desc: '2022年11月13日 | 模型：uron' },
  { img: new URL('@/assets/images/banner3.jpg', import.meta.url).href, title: '私服形象', desc: '2023年5月29日 | 画师：ana | 模型：涵涵' },
  { img: new URL('@/assets/images/banner4.jpg', import.meta.url).href, title: 'Q版形象', desc: '2023年9月2日 | 画师：ニャドラ | 模型：Miggy' },
  { img: new URL('@/assets/images/banner5.jpg', import.meta.url).href, title: '三周年纪念3D形象', desc: '2023年12月16日 | 画师：ana | 模型：uron' },
  { img: new URL('@/assets/images/banner6.jpg', import.meta.url).href, title: '汉服形象', desc: '2024年2月12日 | 画师：CAROTA、ana | 模型：Miggy' },
  { img: new URL('@/assets/images/banner7.jpg', import.meta.url).href, title: 'Q版洛丽塔', desc: '2024年6月8日 | 画师：ニャドラ | 模型：Miggy' },
  { img: new URL('@/assets/images/banner8.jpg', import.meta.url).href, title: '制服形象', desc: '2024年10月26日 | 画师：ana | 模型：梦野依依' },
  { img: new URL('@/assets/images/banner9.jpg', import.meta.url).href, title: '3D娃娃菜', desc: '2024年12月28日 | 模型：Rぷりん、ぬこ' },
  { img: new URL('@/assets/images/banner10.jpg', import.meta.url).href, title: '女仆形象', desc: '2025年6月21日 | 画师：ana | 模型：梦野依依' },
])

// 判断是否手机端
const isMobile = ref(false)
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
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

/* 手机端适配：高度缩小 + 纯滑动无按钮 */
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