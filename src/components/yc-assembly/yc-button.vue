<template>
<!-- 自定义按钮 -->
  <button class="yc-button" @click="clickFun">
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  methods: {
    clickFun () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.yc-button {
  width: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 19px;
  height: 32px;
  border-radius: 4px;
  outline: 0;
  border: 1px solid #306BE2;
  cursor: pointer;
  background: #fff;
  span {
    color: #306BE2;
    font-size: 13px;
  }
  &:hover {
    background: #306BE2;
    span {
      color: #fff;
    }
  }
  &:active {
    background: #306BE2;
    span {
      color: #fff;
    }
  }
}
</style>
