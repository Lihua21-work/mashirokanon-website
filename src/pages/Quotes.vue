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
            <div class="quote-footer">
              <span>—— 真白花音</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ChatDotRound } from '@element-plus/icons-vue'

const quotes = [
  {
    content: '大家好，我是真白花音，大家可以叫我白菜！'
  },
  {
    content: '中文真的好难啊，但是我会努力学习的！'
  },
  {
    content: '谢谢大家的支持，我会继续加油的！'
  },
  {
    content: '这个游戏好难啊，我好菜啊！'
  },
  {
    content: '唱歌真开心，希望大家喜欢我的歌声！'
  },
  {
    content: '大家要天天开心哦！'
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

.quote-footer {
  text-align: right;
  padding: 10px 20px;
  border-top: 1px solid #eee;
  color: #666;
}
</style>