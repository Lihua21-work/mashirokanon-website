import { createApp } from 'vue'
import router from './router/router.js'
import { createPinia } from 'pinia';
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//导入Element-plus的图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);

//自动引入图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia();
app.use(router).use(pinia);
app.use(ElementPlus);
app.mount('#app');