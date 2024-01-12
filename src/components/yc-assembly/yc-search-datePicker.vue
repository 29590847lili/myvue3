<template>
  <div class="search-item">
    <label class="search-label" :style="`min-width:${labelWidth}px`">{{title}}：</label>
    <el-date-picker
      v-model="dateValue"
      @change="getValue"
      type="daterange"
      class="w-220"
      value-format="yyyy-MM-dd"
      :range-separator="rangeSeparator"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    labelWidth: {
      default: 70
    },
    value: {
      default: () => []
    },
    startPlaceholder: {
      type: String,
      default: '开始日期'
    },
    endPlaceholder: {
      type: String,
      default: '结束日期'
    },
    rangeSeparator: {
      type: String,
      default: '至'
    }
  },
  data () {
    return {
      dateValue: []
    }
  },
  watch: {
    value: {
      handler (nVal, oVal) {
        this.dateValue = nVal
      },
      deep: true
    }
  },
  model: {
    prop: 'value',
    event: 'getValue'
  },
  methods: {
    getValue () {
      this.$emit('getValue', this.dateValue)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
