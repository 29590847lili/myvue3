<template>
  <div :class="level == 4 ? 'address' : 'short_address'">
    <el-select v-model="array[0]" :disabled="disabled" class="w-150 m-r-10" placeholder="省" :default-first-option="true" @change="getResourceDetaileByCode(array[0], 'cityData', 'change')" filterable clearable @clear="resetCityCode()">
      <el-option v-for="item in provinceData" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
    <el-select v-model="array[1]" :disabled="disabled" class="w-150 m-r-10" placeholder="市" :default-first-option="true" @change="getResourceDetaileByCode(array[1], 'countyData','change')" filterable>
      <el-option v-for="item in cityData" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
    <el-select v-model="array[2]" :disabled="disabled" class="w-150 m-r-10" placeholder="区县" :default-first-option="true" @change="level == 3 ? lastCode : getResourceDetaileByCode(array[2], 'townData','change')" filterable>
      <el-option v-for="item in countyData" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
    <el-select v-model="array[3]" :disabled="disabled" class="w-150" placeholder="街道/乡镇" :default-first-option="true" v-if="level == 4" filterable @change="lastCode">
      <el-option v-for="item in townData" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
  </div>
</template>

<script>
import { getAreaByCode } from '@/axios/systemManage'
export default {
  data () {
    return {
      array: [],
      provinceData: [], // 省
      cityData: [], // 市
      countyData: [], // 区
      townData: [] // 街道
    }
  },
  props: {
    value: {
      default: () => ''
    },
    disabled: {
      default: false
    },
    level: {
      default: 4
    }
  },
  model: {
    prop: 'value',
    event: 'getValue'
  },
  watch: {
    value: {
      // 返回的是最后一个级别的值，推出之前的数组，然后进行查询
      handler (value, oldVal) {
        // 省市区
        if (value) {
          value = value.toString()
          const provice = value.substr(0, 2)
          const city = value.substr(2, 2)
          const area = value.substr(4, 2)
          if (value.length === 9) {
            this.setArray([parseInt(provice + '0000000'), parseInt(provice + city + '00000'), parseInt(provice + city + area + '000'), parseInt(value)])
          }
          if (value.length === 6) {
            this.setArray([parseInt(provice + '0000000'), parseInt(provice + city + '00000'), parseInt(provice + city + area + '000')])
          }
        } else {
          // 如果赋值是空值，清空下拉
          if (!value && oldVal) {
            // this.array = []
            // this.cityData = [] // 市
            // this.countyData = [] // 区
            // this.townData = [] // 街道
          }
        }
      },
      immediate: true
    },
    array: {
      handler (newVal, oldVal) {
        if (oldVal) {
          // 切换情况改变下级的值
          if (newVal[0] && newVal[0] !== oldVal[0]) {
            this.getResourceDetaileByCode(newVal[0], 'cityData')
          }
          if (newVal[1] && newVal[1] !== oldVal[1]) {
            this.getResourceDetaileByCode(newVal[1], 'countyData')
          }
          if (newVal[2] && newVal[2] !== oldVal[2]) {
            this.getResourceDetaileByCode(newVal[2], 'townData')
          }
          // 等于三级或者四级 即最后一级改变val值
          if (newVal[2] && this.level === 3) {
            this.$emit('getValue', newVal[2].toString().substr(0, 6))
          }
          if (newVal[3] && this.level === 4) {
            this.$emit('getValue', newVal[3])
          }
        } else {
          // 回显情况默认进行查询
          if (newVal[0]) {
            this.getResourceDetaileByCode(newVal[0], 'cityData')
          }
          if (newVal[1]) {
            this.getResourceDetaileByCode(newVal[1], 'countyData')
          }
          if (newVal[2]) {
            this.getResourceDetaileByCode(newVal[2], 'townData')
          }
        }
      },
      immediate: true
    }
  },
  created () {
    // 获取四级地址只有一个接口传入对应code查询下级, 不传code 默认传省
    this.getResourceDetaileByCode(null, 'provinceData')
  },
  methods: {
    setArray (val) {
      this.array = val
    },
    // 切换最后一个
    lastCode (e) {
      this.$emit('getValue', e)
    },
    // 联动查询城市字典
    async getResourceDetaileByCode (code, val, type) {
      if (code) {
        if (val === 'cityData') {
          code = code.toString().substring(0, 2)
          // 切换地址进行清空
          if (type === 'change') {
            this.cityData = []
            this.countyData = []
            this.townData = []
            this.setArray([this.array[0], null, null, null])
            this.$emit('getValue', '')
          }
        }
        if (val === 'countyData') {
          code = code.toString().substring(0, 4)
          if (type === 'change') {
            this.countyData = []
            this.townData = []
            this.setArray([this.array[0], this.array[1], null, null])
            this.$emit('getValue', '')
          }
        }
        if (val === 'townData') {
          code = code.toString().substring(0, 6)
          if (this.level === 3) {
            // 如果是三级 选择第三级后修改数据
            this.$emit('getValue', code)
          }
          if (type === 'change') {
            this.townData = []
            this.setArray([this.array[0], this.array[1], this.array[2], null])
            this.$emit('getValue', '')
          }
        }
      }
      const res = await getAreaByCode({ code })
      if (res.code === 200) {
        if (code) {
          this[val] = res.data
          // 如果市数据不匹配把对应数组清空
          if (val === 'cityData') {
            const cityDataCode = this.array[1]
            const arr = this.cityData.filter(item => { return item.id === cityDataCode })
            if (arr.length === 0) {
              this.array[1] = null
            }
          }
          // 如果区县级数据不匹配把对应数组清空
          if (val === 'countyData') {
            const countyDataCode = this.array[2]
            const arr = this.countyData.filter(item => { return item.id === countyDataCode })
            if (arr.length === 0) {
              this.array[2] = null
            }
          }
          // 如果乡镇级数据不匹配把对应数组清空
          if (val === 'townData') {
            const townDataCode = this.array[3]
            const arr = this.townData.filter(item => { return item.id === townDataCode })
            if (arr.length === 0) {
              this.array[3] = null
            }
          }
        } else { // 如果没有code给省赋值
          this.provinceData = res.data
        }
      }
    },
    // 清空
    resetCityCode () {
      this.array = []
      this.$emit('getValue', '')
      this.cityData = [] // 市
      this.countyData = [] // 区
      this.townData = [] // 街道
    }
  }
}
</script>

<style lang="less" scoped>
.w-150 {
  width: 165px !important;
}
.address {
  width: 690px;
}
.short_address {
  width: 480px;
}
</style>
