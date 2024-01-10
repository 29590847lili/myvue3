
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// 公共组件
import registerComponents from '@/utils/global-components'

import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import store from '@/store/index' // 引入之前创建的 Vuex 存储
// Axios
import axios from 'axios'
import '@/axios/request'
// 引入全局css
import '@/styles/reset.less'
import '@/styles/style.less'
import '@/styles/layout.less'
import '@/styles/reset-element-ui.less'
import '@/iconfont/iconfont.css'

const app = createApp(App)
registerComponents(app)
app.config.globalProperties.$axios = axios
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
