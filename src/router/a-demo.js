// 预约管理
const OneRoute = [
  {
    path: '/two',
    name: '预约管理',
    icon: 'iconfont icon-shengwuxuejiance',
    component: () => import('@/views/index'),
    children: [
      {
        path: 'minge',
        name: '筛查名额',
        component: () => import('@/views/one/fit'),
        children: [
          {
            path: 'minge-1',
            name: '筛查名额-1',
            component: () => import('@/views/one/fit'),
            meta: { parentTitle: '预约管理', title: '筛查名额-1', path: '/two/minge/minge-1', visible: true, keepAlive: false }
          },
          {
            path: 'minge-2',
            name: '筛查名额-2',
            component: () => import('@/views/one/fit'),
            meta: { parentTitle: '预约管理', title: '筛查名额-2', path: '/two/minge/minge-2', visible: true, keepAlive: false }
          }
        ]
      },
      {
        path: 'qiandao',
        name: '签到管理',
        component: () => import('@/views/one/fit'),
        meta: { parentTitle: '预约管理', title: '签到管理', path: '/two/qiandao', visible: true, keepAlive: false }
      }
    ]
  }
]
export default OneRoute
