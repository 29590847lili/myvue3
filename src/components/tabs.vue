<template>
  <div class="tabs">
    <div v-for="(item, index) in option" :key="index" @click="selectItem(item)" class="tabs-item" :class="item.value === active ? 'active' : ''">{{item.label}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: ''
    }
  },
  props: {
    value: {
      default: ''
    },
    option: {
      default: () => []
    }
  },
  watch: {
    value: {
      handler (value) {
        this.active = value
      },
      immediate: true
    }
  },
  model: {
    prop: 'value',
    event: 'setValue'
  },
  methods: {
    setValue () {
      this.$emit('setValue', this.active)
    },
    selectItem (item) {
      this.active = item.value
      this.setValue()
    }
  }
}
</script>

<style lang="less" scoped>
.tabs{display:flex;height:40px;margin:0 20px;
  .tabs-item{padding:0 20px;height:40px;line-height:40px;cursor:pointer;}
  .active{background:#fff;border-radius:4px 4px 0 0;position: relative;cursor:default;
    &::after{width:4px;height:4px;background:#fff;content:'';position:absolute;left:0;bottom:-4px;}
  }
}
</style>
