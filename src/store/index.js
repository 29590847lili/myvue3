import { createStore } from 'vuex'

const store = createStore({
  state: {
    appId: 1,
    objectName: '公用系统名称',
    roleInfo: {}, // 角色信息
    userInfo: {}, // 登录用户信息
    menus: [], // 菜单路由
    menuPaths: [], // 层级路由
    loading: false, // 是否显示loading
    pageSizes: [10, 20, 50, 100], // 翻页pageSizes
    pageSize: 10, // 当前页条数
    layout: 'total, sizes, prev, pager, next, jumper', // 翻页组件
    singleFunction: { // 独立功能模块
      updatePassword: false // 修改密码
    }
  },
  mutations: {
    commitPasswordStatus (state, flag) { // 修改密码
      state.singleFunction.updatePassword = flag
    },
    commitMenu (state, val) {
      state.menus = val
    }
  },
  actions: {
  },
  modules: {
  }
})
export default store
