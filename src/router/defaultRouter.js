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
    path: '/page',
    name: '欢迎',
    icon: 'iconfont icon-home',
    level: 1,
    component: () => import('@/views/index.vue'),
    children: [
      {
        path: '/welcome',
        name: '首页',
        component: () => import('@/views/home/welcome.vue'),
        meta: { title: '首页', path: '/welcome', visible: true, keepAlive: false }
      },
      {
        path: '/503',
        name: '503',
        component: () => import('@/views/503.vue'),
        meta: { title: '', path: '/503', visible: false, keepAlive: false }
      }
    ]
  },
  {
    path: '/:path(.*)',
    redirect: '/404'
  },
  {
    path: '/404',
    name: '404',
    title: '页面找不到了',
    component: () => import('@/views/404.vue')
  }
]
export default defaultRouter
