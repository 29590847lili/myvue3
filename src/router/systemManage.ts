// 系统管理
const Route = [
  {
    path: '/systemManage',
    name: '系统管理',
    icon: 'iconfont icon-xitong',
    level: 2,
    component: () => import('@/views/index.vue'),
    children: [
      {
        path: 'usersManage',
        name: '账号管理',
        component: () => import('@/views/systemManage/usersManage.vue'),
        meta: { parentTitle: '系统管理', title: '账号管理', path: '/systemManage/usersManage', visible: true, keepAlive: false }
      },
      {
        path: 'roleManage',
        name: '角色管理',
        component: () => import('@/views/systemManage/roleManage.vue'),
        meta: { parentTitle: '系统管理', title: '角色管理', path: '/systemManage/roleManage', visible: true, keepAlive: false }
      },
      {
        path: 'permissionSetting',
        name: '权限设置',
        component: () => import('@/views/systemManage/components/permissionSetting.vue'),
        meta: { ancestorTitle: '系统管理', parentTitle: '角色管理', title: '权限设置', parentPath: '/systemManage/roleManage', path: '/systemManage/permissionSetting', visible: false, keepAlive: false }
      },
      {
        path: 'menuManage',
        name: '菜单管理',
        component: () => import('@/views/systemManage/menuManage.vue'),
        meta: { parentTitle: '系统管理', title: '菜单管理', path: '/systemManage/menuManage', visible: true, keepAlive: false }
      }
    ]
  }
]
export default Route

