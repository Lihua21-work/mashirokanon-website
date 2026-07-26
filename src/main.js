import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/router.js'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'

// 全局注册 Element Plus 图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia()
app.use(router)
app.use(pinia)
app.use(ElementPlus)

app.mount('#app')