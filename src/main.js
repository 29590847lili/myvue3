import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 引入之前创建的 Vuex 存储
import store from '@/store/index'
// Axios
import axios from 'axios'
import '@/axios/request'
// 引入全局css
import '@/styles/reset.less'
import '@/styles/style.less'
import '@/styles/layout.less'
import '@/styles/reset-element-plus-ui.less'
import '@/iconfont/iconfont.css'



// 公共组件
import registerComponents from '@/utils/global-components'

const app = createApp(App)
registerComponents(app)
app.config.globalProperties.$axios = axios
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.use(store)
app.mount('#app')
