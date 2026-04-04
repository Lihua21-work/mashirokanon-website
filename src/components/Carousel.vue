<template>
  <el-carousel
    height="500px"
    :autoplay="true"
    :interval="4000"
    indicator-position="outside"
  >
    <el-carousel-item>
      <div class="carousel-item">
        <img src="@/assets/images/banner1.jpg" alt="新形象" class="carousel-image" />
        <div class="carousel-text">
          <h2>新形象</h2>
          <p>2022年5月29日 | 画师：ana | 模型：涵涵</p>
        </div>
      </div>
    </el-carousel-item>

    <el-carousel-item>
      <div class="carousel-item">
        <img src="@/assets/images/banner2.jpg" alt="3D形象" class="carousel-image" />
        <div class="carousel-text">
          <h2>3D形象</h2>
          <p>2022年11月13日 | 模型：uron</p>
        </div>
      </div>
    </el-carousel-item>

    <el-carousel-item>
      <div class="carousel-item">
        <img src="@/assets/images/banner3.jpg" alt="私服形象" class="carousel-image" />
        <div class="carousel-text">
          <h2>私服形象</h2>
          <p>2023年5月29日 | 画师：ana | 模型：涵涵</p>
        </div>
      </div>
    </el-carousel-item>

    <el-carousel-item>
      <div class="carousel-item">
        <img src="@/assets/images/banner4.jpg" alt="Q版形象" class="carousel-image" />
        <div class="carousel-text">
          <h2>Q版形象</h2>
          <p>2023年9月2日 | 画师：ニャドラ | 模型：Miggy</p>
        </div>
      </div>
    </el-carousel-item>

    <el-carousel-item>
      <div class="carousel-item">
        <img src="@/assets/images/banner5.jpg" alt="三周年纪念3D形象" class="carousel-image" />
        <div class="carousel-text">
          <h2>三周年纪念3D形象</h2>
          <p>2023年12月16日 | 画师：ana | 模型：uron</p>
        </div>
      </div>
    </el-carousel-item>

    <el-carousel-item>
      <div class="carousel-item">
        <img src="@/assets/images/banner6.jpg" alt="汉服形象" class="carousel-image" />
        <div class="carousel-text">
          <h2>汉服形象</h2>
          <p>2024年2月12日 | 画师：CAROTA、ana | 模型：Miggy</p>
        </div>
      </div>
    </el-carousel-item>

    <el-carousel-item>
      <div class="carousel-item">
        <img src="@/assets/images/banner7.jpg" alt="Q版洛丽塔" class="carousel-image" />
        <div class="carousel-text">
          <h2>Q版洛丽塔</h2>
          <p>2024年6月8日 | 画师：ニャドラ | 模型：Miggy</p>
        </div>
      </div>
    </el-carousel-item>

    <el-carousel-item>
      <div class="carousel-item">
        <img src="@/assets/images/banner8.jpg" alt="制服形象" class="carousel-image" />
        <div class="carousel-text">
          <h2>制服形象</h2>
          <p>2024年10月26日 | 画师：ana | 模型：梦野依依</p>
        </div>
      </div>
    </el-carousel-item>

    <el-carousel-item>
      <div class="carousel-item">
        <img src="@/assets/images/banner9.jpg" alt="3D娃娃菜" class="carousel-image" />
        <div class="carousel-text">
          <h2>3D娃娃菜</h2>
          <p>2024年12月28日 | 模型：Rぷりん、ぬこ</p>
        </div>
      </div>
    </el-carousel-item>

    <el-carousel-item>
      <div class="carousel-item">
        <img src="@/assets/images/banner10.jpg" alt="女仆形象" class="carousel-image" />
        <div class="carousel-text">
          <h2>女仆形象</h2>
          <p>2025年6月21日 | 画师：ana | 模型：梦野依依</p>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

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

/* 手机端适配 */
@media (max-width: 768px) {
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