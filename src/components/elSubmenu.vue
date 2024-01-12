<template>
  <div>
    <el-sub-menu :index="menus.path" class="menu-one">
      <template #title>
        <i :class="menus.icon"></i>
        <span>{{menus.name}}</span>
      </template>
      <template v-if="menus.level > 1">
        <template v-for="item in menus.children">
          <template v-if="item.children && item.children.length">
            <el-sub-menu :index="item.path" :key="item.path" class="menu-three">
              <span>{{item.name}}</span>
              <template v-if="item.children && item.children">
                <template v-for="cItem in item.children">
                  <el-menu-item v-if="cItem.meta.visible" :index="cItem.meta.path" :key="cItem.meta.path">{{cItem.meta.title}}</el-menu-item>
                </template>
              </template>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item v-if="item.meta.visible" :index="item.meta.path" :key="item.path" class="menu-two"><i class="dot"></i>{{item.meta.title}}</el-menu-item>
          </template>
        </template>
      </template>
    </el-sub-menu>
  </div>
</template>

<script>
export default {
  name: 'submenu',
  props: {
    menus: {
      default: () => { },
      type: Object
    }
  },
  watch: {
    $route: {
      handler (router) {
        const path = router.meta.parentPath ? router.meta.parentPath : router.meta.path // 判断是否详情
        localStorage.setItem('defaultActive', path)
        this.defaultActive = path
      },
      deep: true
    }
  },
  created () {
    const path = this.$route.meta.parentPath ? this.$route.meta.parentPath : this.$route.meta.path // 判断是否详情
    this.defaultActive = path
  }
}
</script>
<style lang="less" scoped>
</style>
