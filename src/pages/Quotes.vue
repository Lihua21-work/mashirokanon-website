<template>
  <div class="quotes-page">
    <div class="container">
      <h1 class="page-title">经典语录</h1>
      <p class="subtitle">记录白菜直播间的名场面与搞笑爆笑金句 💬</p>
      
      <el-row :gutter="24" justify="center">
        <el-col :xs="24" :sm="12" :md="12" v-for="(quote, index) in quotes" :key="index">
          <div class="quote-card">
            <div class="quote-header">
              <span class="quote-mark">“</span>
              <span class="quote-tag">{{ quote.tag || '名场面' }}</span>
            </div>
            
            <p class="quote-text">{{ quote.content }}</p>

            <div class="quote-footer">
              <span class="quote-author">— 眞白花音</span>
              <el-button 
                size="small" 
                round
                :type="copiedIndex === index ? 'success' : 'primary'"
                class="copy-btn"
                @click="copyQuote(quote.content, index)"
              >
                <el-icon style="margin-right: 4px;">
                  <Check v-if="copiedIndex === index" />
                  <DocumentCopy v-else />
                </el-icon>
                {{ copiedIndex === index ? '已复制' : '复制金句' }}
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DocumentCopy, Check } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const copiedIndex = ref(-1)

const quotes = [
  {
    content: '给你一拳，欧拉欧拉！',
    tag: '拳击怪白菜'
  },
  {
    content: '帕清姬没有女朋友～',
    tag: '致命重击'
  }
]

const copyQuote = (text, index) => {
  navigator.clipboard.writeText(text).then(() => {
    copiedIndex.value = index
    ElMessage.success({
      message: '语录已成功复制到剪贴板！',
      offset: 70
    })
    setTimeout(() => {
      copiedIndex.value = -1
    }, 2000)
  }).catch(() => {
    ElMessage.error('复制失败，请手动复制')
  })
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.subtitle {
  text-align: center;
  color: var(--text-secondary);
  font-size: 15px;
  margin-top: -24px;
  margin-bottom: 40px;
}

.quote-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 170px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.quote-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-md);
  border-color: rgba(255, 123, 155, 0.3);
}

.quote-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.quote-mark {
  font-size: 36px;
  font-family: Georgia, serif;
  color: var(--primary-color);
  opacity: 0.6;
  line-height: 1;
}

.quote-tag {
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 12px;
  background: rgba(255, 123, 155, 0.08);
  color: var(--primary-color);
  font-weight: 600;
}

.quote-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-main);
  line-height: 1.6;
  margin: 8px 0 16px 0;
  flex: 1;
}

.quote-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px dashed rgba(0, 0, 0, 0.06);
  padding-top: 12px;
}

.quote-author {
  font-size: 13px;
  color: var(--text-secondary);
}

.copy-btn {
  color: #fff !important;
}
</style>