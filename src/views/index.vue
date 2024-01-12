<template>
  <div id="router-view">
    <PageHeader />
    <div id="app-main">
      <div id="app-left">
        <GlobalMenu />
      </div>
      <div id="app-right">
        <!-- 面包屑 -->
        <CrumbsMenu />
        <!-- 路由视图 -->
        <div class="right-container">
          <keep-alive>
            <RouterView v-if="$route.meta.keepAlive" class="right-content" />
          </keep-alive>
          <RouterView v-if="!$route.meta.keepAlive" class="right-content" />
        </div>
        <!-- 独立功能模块区域 -->
        <!-- 修改密码 -->
        <UpdatePassword />
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/pageHeader.vue'
import UpdatePassword from '@/components/updatePassword.vue'
export default {
  data () {
    return {
      hideAssembly: false
    }
  },
  components: {
    PageHeader,
    UpdatePassword
  }
}
</script>

<style lang="less" scoped>
@leftWidth: 240px;
#app-main {
  width: 100%;
  height: calc(100% - 56px);
  display: flex;
  #app-left {
    width: @leftWidth;
    height: 100%;
    background: #fff;
  }
  #app-right {
    width: calc(100% - @leftWidth);
    height: 100%;
    padding: 0;
    background: #eceff5;
    position: relative;
    .right-container {
      width: 100%;
      height: calc(100% - 50px);
      .right-content {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background: #eceff5;
      }
    }
  }
}
.el-sub-menu__title i,
.el-menu-item i {
  color: #fff;
}
</style>
