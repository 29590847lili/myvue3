import $store from '@/store/index'
import { createRouter, createWebHistory } from 'vue-router'
import { Timing } from '@/utils/timing'
import DefaultRouter from './defaultRouter' // 默认路由配置
import SystemManage from './systemManage' // 系统管理


const routes = [
  ...DefaultRouter,
  ...SystemManage
]

// const router = new VueRouter({
//   mode: 'hash', // history
//   base: process.env.BASE_URL,
//   routes
// })
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 防止重复点击路由
// const VueRouterPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (to) {
//   return VueRouterPush.call(this, to).catch(err => err)
// }

// 路由全局守卫
router.beforeEach((to, from, next) => {
  // 性能监控
  Timing()
  // 更改页面title
  document.title = $store.state.objectName
  // 静态路由 动态路由接口再/components/globalMenu.vue中调取接口获得
  // $store.state.menus = []
  // $store.state.menuPaths = []
  // routes.filter(item => {
  //   // 菜单路由
  //   if (item.meta || item.children) $store.state.menus.push(item)
  //   // 层级路由
  //   if (item.meta && !item.children) $store.state.menuPaths.push(item.meta.path)
  //   if (!item.meta && item.children) {
  //     item.children.map(cItem => {
  //       $store.state.menuPaths.push(cItem.meta.path)
  //     })
  //   }
  // })
  if (to.path === '/') {
    localStorage.clear() // 清空本地存储
    // 清空vuex中的部分数据
    $store.state.menus = [] // 清空菜单信息
    $store.state.menuPaths = [] // 清空菜单路径信息
    $store.state.userInfo = {} // 清空用户信息
    $store.state.roleInfo = {} // 清空角色信息
    next()
  } else {
    if (to.path === '/forget') { // 忘记密码
      next()
    } else {
      if (localStorage.getItem('Authorization')) {
        next()
      } else {
        router.push('/')
        next()
      }
    }
  }
})

export default router
