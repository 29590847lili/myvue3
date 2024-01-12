<template>
  <div class="search-item">
    <label class="search-label" :style="`min-width:${labelWidth}px`">{{title}}：</label>
    <el-select v-model="inputValue" @change="getValue" class="w-220" :placeholder="placeholder" clearable>
      <el-option v-for="item in option" :key="item.value" :label="item[props.label]" :value="item[props.value]" />
    </el-select>
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
      default: '请选择'
    },
    labelWidth: {
      default: 70
    },
    modelValue: {
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
  emits: ['update:modelValue'],
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
    }
  }
}
</script>

<style lang="less" scoped>
</style>
