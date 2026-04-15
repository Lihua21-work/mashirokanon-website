<template>
  <div class="quotes">
    <div class="container">
      <h1 class="page-title">经典语录</h1>
      
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" v-for="(quote, index) in quotes" :key="index">
          <el-card class="quote-card">
            <div class="quote-content">
              <el-icon class="quote-icon">
                <ChatDotRound />
              </el-icon>
              <p>{{ quote.content }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ChatDotRound } from '@element-plus/icons-vue'

// 只保留前两条语录
const quotes = [
  {
    content: '给你一拳，欧拉欧拉！'
  },
  {
    content: '帕清姬没有女朋友～'
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

.quote-card {
  margin-bottom: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.quote-content {
  padding: 20px;
}

.quote-icon {
  font-size: 30px;
  color: #409eff;
  margin-bottom: 15px;
}

.quote-content p {
  line-height: 1.8;
  color: #333;
  font-size: 16px;
  font-style: italic;
}
</style>