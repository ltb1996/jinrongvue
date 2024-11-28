import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/assets/css/main.scss'
import '@/assets/css/tailwind.css'

import {registerEcharts} from "@/plugins/echarts"
//不使用mock 请注释掉
import { mockXHR } from "@/mock/index";

import ElementPlus from 'element-plus'
// 引入全局 CSS 样式
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

mockXHR()

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
registerEcharts(app)
app.use(createPinia())
app.use(router)

app.use(ElementPlus)

app.mount('#app')
