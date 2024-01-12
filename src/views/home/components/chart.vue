<template>
  <div :id="domId" :style="{width: '100%', height: `${domHeight}px`}"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    domId: String, // 图表容器id
    domHeight: [String, Number], // 图表容器的高
    chartOption: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    chartOption: {
      handler (val) {
        this.drawChart(val)
      },
      deep: true
    }
  },
  methods: {
    drawChart (opt) {
      this.charts = echarts.init(document.getElementById(this.domId))
      this.charts.setOption(opt || this.chartOption)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.drawChart()
    })
  }
}
</script>
