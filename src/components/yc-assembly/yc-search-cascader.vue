<template>
  <div class="search-item">
    <label class="search-label" :style="`min-width:${labelWidth}px`">{{title}}：</label>
    <el-cascader v-model="inputValue" :options="option" @change="getValue" :props="{ ...props, ...{checkStrictly: true} }" :show-all-levels="false" clearable class="w-220"></el-cascader>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputValue: []
    }
  },
  props: {
    title: {
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    labelWidth: {
      default: 70
    },
    value: {
      default: ''
    },
    option: {
      default: () => []
    },
    props: {
      default: () => {
        return { label: 'label', value: 'value' }
      }
    }
  },
  model: {
    prop: 'value',
    event: 'getValue'
  },
  watch: {
    value: {
      handler (v) {
        this.inputValue = v
      },
      deep: true
    }
  },
  created () {
    this.inputValue = this.value
  },
  methods: {
    getValue () {
      this.$emit('getValue', this.inputValue)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
