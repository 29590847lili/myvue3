<template>
  <div class="page-left">
    <div class="global-menu">
      <el-menu :defaultActive="defaultActive" @select="clearStorage" router>
        <template v-for="(item) in $store.state.menus">
          <template v-if="item.level === 1">
            <!-- 一级导航 -->
            <el-menu-item class="one-link" :index="item.children[0].meta.path" :key="item.children[0].meta.path">
              <i :class="item.icon"></i>
              <span slot="title">{{item.children[0].meta.title}}</span>
            </el-menu-item>
          </template>
          <!-- 多级 -->
          <template v-else>
            <ElSubmenu :menus="item" :key="item.path" />
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import ElSubmenu from './elSubmenu'
import { getQueryUserRoleByUserId, getUserCurrent, getMenuRoleTree } from '@/axios/users'
export default {
  data () {
    return {
      defaultActive: '' // 当前页路由
    }
  },
  watch: {
    $route: {
      handler (router) {
        const path = router.meta.parentPath ? router.meta.parentPath : router.meta.path // 判断是否详情
        localStorage.setItem('defaultActive', path)
        this.defaultActive = path
      },
      deep: true,
      immediate: true
    }
  },
  created () {
    if (localStorage.getItem('defaultActive')) this.defaultActive = localStorage.getItem('defaultActive')
    this.getUserCurrent()
  },
  methods: {
    clearStorage () {
      sessionStorage.removeItem('search') // 清除列表跳详情存储的查询条件呢
      localStorage.removeItem('roleItem') // 清除给角色加权限 角色信息
    },
    // 获取用户信息
    async getUserCurrent () {
      const res = await getUserCurrent()
      if (res.code === 200) {
        this.$store.state.userInfo = res.data
        // 本地存储用户信息
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        this.getQueryUserRoleByUserId(res.data.userId)
      }
    },
    // 根据userid获取当前用户角色信息
    async getQueryUserRoleByUserId (userId) {
      const res = await getQueryUserRoleByUserId(userId)
      if (res.code === 200) {
        if (res.data.length) { // 角色可能是多条
          this.$store.state.roleInfo = res.data[0]
          this.getMenuRoleTreeOpen()
        }
      }
    },
    // 获取菜单
    async getMenuRoleTreeOpen () {
      const params = `${this.$store.state.roleInfo.roleId}?appId=${this.$store.state.appId}`
      const res = await getMenuRoleTree(params)
      if (res.code === 200) {
        const menus = await this.changeLocalRoute(res.data) // 换区本地路由
        this.$store.state.menus = menus
        if (menus.length === 0) {
          this.$router.push('/503')
          this.$alert('<p>当前用户无菜单权限或角色权限，请联系管理员</p><p style="color:#f00">系统将返回登录页</p>', '提示', {
            dangerouslyUseHTMLString: true,
            showClose: false
          }).then(() => {
            this.$router.push('/')
          })
        }
      }
    },
    // 换取本地路由
    changeLocalRoute (OnlineRoute) {
      const LocalRoute = this.$router.options.routes
      const resultRoute = []
      OnlineRoute.map($1item => { // 线上路由
        LocalRoute.map(_1Item => { // 本地路由
          if ($1item.name === _1Item.name) {
            const routeItem = {
              name: $1item.name,
              icon: $1item.icon,
              path: $1item.path,
              level: _1Item.level,
              meta: { ..._1Item.meta, ...{ menuId: $1item.id } },
              children: []
            }
            if ($1item.children && $1item.children.length) { // 二级 线上路由
              $1item.children.map($2Item => {
                if (_1Item.children && _1Item.children.length) {
                  _1Item.children.map(_2Item => { // 二级 本地路由
                    if ($2Item.path === _2Item.path) {
                      if (_2Item.meta && $2Item.meta) {
                        _2Item.meta.title = $2Item.meta.title
                        _2Item.meta.menuId = $2Item.id
                      }
                      const params = {
                        ..._2Item,
                        children: []
                      }
                      routeItem.children.push(params)
                      if ($2Item.children && $2Item.children.length) {
                        $2Item.children.map($3Item => {
                          if (_2Item.children && _2Item.children.length) {
                            _2Item.children.map(_3Item => {
                              if ($3Item.path === _3Item.path) {
                                if (_3Item.meta && $3Item.meta) {
                                  _3Item.meta.title = $3Item.meta.title
                                }
                                params.children.push(_3Item)
                              }
                            })
                          }
                        })
                      }
                    }
                  })
                }
              })
            }
            resultRoute.push(routeItem)
          }
        })
      })
      return resultRoute
    }
  },
  components: {
    ElSubmenu
  }
}
</script>

<style lang="less" scoped>
.page-left {
  width: 100%;
  height: 100%;
  padding-top: 10px;
}
</style>
