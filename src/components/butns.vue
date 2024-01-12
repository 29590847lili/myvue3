<template>
  <div></div>
</template>

<script>
import { getMenuUserTree } from '@/axios/users'
export default {
  data () {
    return {
      butns: []
    }
  },
  props: {
    value: {
      default: () => []
    }
  },
  watch: {
    value: {
      handler (value) {
        this.butns = value
      }
    }
  },
  model: {
    prop: 'value',
    event: 'setValue'
  },
  mounted () {
    // this.setMenuId()
  },
  methods: {
    setValue () {
      this.$emit('setValue', this.butns)
    },
    setMenuId () {
      if (this.$route.meta && this.$route.meta.menuId) {
        this.getMenuUserTree(this.$route.meta.menuId)
      } else {
        setTimeout(() => {
          this.setMenuId()
        }, 100)
      }
    },
    // 获取当前页面按钮权限
    async getMenuUserTree (menuId) {
      const res = await getMenuUserTree(menuId)
      if (res.code === 200) {
        this.butns = res.data.map(item => item.menuCode)
        this.setValue()
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
