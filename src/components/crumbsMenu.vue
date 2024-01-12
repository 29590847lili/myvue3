<template>
  <div class="crumbs-menu">
    <div v-if="$route.meta.ancestorTitle">{{$route.meta.ancestorTitle}}<span>/</span></div>
    <div v-if="$route.meta.parentTitle">{{$route.meta.parentTitle}}<span>/</span></div>
    <div v-if="$route.meta.title">{{$route.meta.title}}</div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.crumbs-menu {
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  font-size: 13px;
  span {
    margin: 0 10px;
  }
}
</style>
