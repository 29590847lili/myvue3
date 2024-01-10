const defaultRouter = [
  // 登录页
  {
    path: '/',
    name: '登录页',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/forget',
    name: '忘记密码',
    component: () => import('@/views/forget.vue')
  },
  {
    path: '/:path(.*)',
    redirect: '/404'
    // component:  () => import('@/views/404.vue'),
    // props: true,  
    // handler: {  
    //   catchAll: (to, from, next) => {  
    //     next('/404')
    //   }  
    // }  
  },
  {
    path: '/404',
    name: '404',
    title: '页面找不到了',
    component: () => import('@/views/404.vue')
  }
]
export default defaultRouter
