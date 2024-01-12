<template>
  <div class="title">
    {{title}}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-left: 10px;
  margin-bottom: 20px;
  &::before {
    display: inline-block;
    width: 3px;
    height: 13px;
    content: '';
    background: #306BE2;
    margin-right: 7px;
    border-radius: 2px;
  }
}
</style>
