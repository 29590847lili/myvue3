<template>
  <div class="submit-box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.submit-box{width:calc(100% - 240px);height:74px;display:flex;justify-content:center;align-items:center;background:#fff;border-radius:0 0 4px 4px;box-shadow:0px -2px 3px 0px rgba(0,0,0,0.0300);position:fixed;right:0px;bottom:0;z-index:10;}
</style>
