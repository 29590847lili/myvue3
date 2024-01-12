<template>
  <transition name="fade">
    <div class="loading" v-show="$store.state.loading">
      <i class="el-icon-loading"></i>
    </div>
  </transition>
</template>

<script>
export default {
}
</script>
<style lang="less" scoped>
.loading{width:100%;height:100%;position:fixed;top:0;right:0;bottom:0;left:0;z-index:9999;background:#fff;opacity:0.8;
  .el-icon-loading{font-size:42px;color:#306BE2;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);}
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
