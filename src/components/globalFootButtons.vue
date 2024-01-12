<template>
  <div class="footer-buttons">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['isShow'],
  mounted () {
    if (this.isShow) {
      document.getElementById('global-main').style = 'padding-bottom:74px'
    }
  }
}
</script>
<style lang="less" scoped>
.footer-buttons{width:calc(100% - 240px);height:74px;position: fixed;bottom:0;z-index:99;background:#fff;box-shadow: -2px -2px 3px 0px rgba(0,0,0,0.03);
text-align: center;line-height:74px; display: flex; align-items: center; justify-content: center;}
</style>
