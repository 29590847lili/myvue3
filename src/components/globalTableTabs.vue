<template>
  <div :class="options&&options.length>0?'global-table-tabs global-table-tabs-line':'global-table-tabs' ">
    <div class="left">
      <div @click="setValue(item)" v-for="(item, index) in options" :key="index" :class="value == item.value ? 'active' : ''">
        {{item.label}}
        <el-tooltip v-if="item.icon && item.text" class="item" effect="dark" :content="item.text" placement="top">
          <i class="iconfont" :class="item.icon" @click.stop></i>
        </el-tooltip>
        <i class="el-icon-warning-outline" v-if="item.warning == 1"></i>
      </div>
      <slot name="text"></slot>
    </div>
    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      default: ''
    },
    isHistory: {
      default: false,
      type: Boolean
    }
  },
  model: {
    prop: 'value',
    event: 'setValue'
  },
  methods: {
    setValue (item) {
      this.$emit('setValue', item.value)
      this.$emit('change', item.value)
    }
  }
}
</script>

<style lang="less" scoped>
.global-table-tabs {
  height: 60px;
  display: flex;
  margin-bottom: 20px;
  padding-bottom: 10px;
  // border-radius: 6px;
  position: relative;
  justify-content: space-between;
  // background: red;
  .left {
    display: flex;
    align-items: flex-end;
    padding-left: 20px;
    div {
      height: 40px;
      line-height: 1.2;
      margin-right: 50px;
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      i.iconfont {
        position: absolute;
        left: calc(100% + 5px);
        top: 50%;
        transform: translate(0, -50%);
        color: #c6c9d1;
      }
      &.active {
        position: relative;
        cursor: default;
        color: #306be2;
        &::after {
          display: block;
          content: '';
          position: absolute;
          left: 0;
          bottom: -12px;
          width: 100%;
          height: 3px;
          background: #306be2;
          border-radius: 4px;
        }
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 10px;
  }
}
.global-table-tabs-line {
  border-bottom: 1px solid #e7e9f1;
}
.el-icon-warning-outline {
  color: #f56c6c;
}
</style>
