<template>
  <div class="search-item">
    <label class="search-label" :style="`min-width:${labelWidth}px`">{{title}}：</label>
    <el-date-picker v-model="selectValue" :picker-options="startDatePicker" @change="getValue" format="yyyy" value-format="yyyy" class="w-220" type="year" placeholder="请选择" clearable></el-date-picker>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectValue: '',
      startDatePicker: this.beginDate()
    }
  },
  props: {
    value: {
      default: ''
    },
    title: {
      default: ''
    },
    startYear: { // 选择那一年年之后的年份, 精确到年
      default: ''
    },
    labelWidth: {
      default: 70
    }
  },
  model: {
    prop: 'value',
    event: 'getValue'
  },
  watch: {
    value: {
      handler (v) {
        this.selectValue = v
      },
      deep: true
    }
  },
  created () {
    this.selectValue = this.value
  },
  methods: {
    getValue () {
      this.$emit('getValue', this.selectValue)
    },
    beginDate () {
      const that = this
      return {
        disabledDate (time) {
          return that.startYear > time.getFullYear()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
