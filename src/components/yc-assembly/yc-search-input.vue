<template>
  <div class="search-item">
    <label class="search-label" :style="`min-width:${labelWidth}px`">{{title}}：</label>
    <el-input v-model="inputValue" @input="getValue" class="w-220" :maxlength="maxlength" :placeholder="placeholder" clearable></el-input>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputValue: ''
    }
  },
  props: {
    title: {
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    labelWidth: {
      default: 70
    },
    maxlength: {
      default: 50
    },
    modelValue: {
      default: ''
    }
  },
  emits: ['update:modelValue'],
  // model: {
  //   prop: 'value',
  //   event: 'getValue'
  // },
  watch: {
    modelValue: {
      handler (v) {
        this.inputValue = v
      },
      deep: true
    }
  },
  created () {
    this.inputValue = this.modelValue
  },
  methods: {
    getValue () {
      this.$emit('update:modelValue', this.inputValue)
      // this.$emit('getValue', this.inputValue)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
