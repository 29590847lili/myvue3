<template>
  <div class="search-item">
    <label class="search-label" :style="`min-width:${labelWidth}px`">{{title}}：</label>
    <div class="address">
      <el-select v-model="formData.province" class="w-120 m-r-10" @change="changeProvice" @clear="resetCityCode(1)" placeholder="省" clearable filterable :default-first-option="true">
        <el-option v-for="item in deptCode.province" :label="item.name" :value="item.code" :key="item.code">
        </el-option>
      </el-select>
      <el-select v-model="formData.city" class="w-120 m-r-10" placeholder="市" @change="changecity(`${formData.city || ''}`)" @clear="resetCityCode(2)" filterable clearable :default-first-option="true">
        <el-option v-for="item in deptCode.city" :label="item.name" :value="item.code" :key="item.code">
        </el-option>
      </el-select>
      <el-select v-model="formData.area" class="w-120 m-r-10" placeholder="区/县" @change="changearea(`${formData.area || ''}`) " @clear="resetCityCode(3)" filterable clearable :default-first-option="true">
        <el-option v-for="item in deptCode.area" :label="item.name" :value="item.code" :key="item.code">
        </el-option>
      </el-select>
      <el-select v-model="formData.street" class="w-120 m-r-10" placeholder="村/街道" filterable clearable :default-first-option="true" @change="lastCode" @clear="resetCityCode(4)">
        <el-option v-for="item in deptCode.street" :label="item.name" :value="item.code" :key="item.code">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { getAreaByCode } from '@/axios/systemManage'
export default {
  data () {
    return {
      formData: {
        province: '',
        city: '',
        area: '',
        street: ''
      },
      deptCode: {
        province: [], // 省
        city: [], // 市
        area: [], // 区
        street: [] // 村
      }
    }
  },
  props: {
    value: {
      default: () => ''
    },
    title: {
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
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
      handler (value) {
        // 如果重置不能更新第一个下拉框
        if (!value) {
          this.formData = {
            province: '',
            city: '',
            area: '',
            street: ''
          }
          this.deptCode.city = []
          this.deptCode.area = []
          this.deptCode.street = []
        }
      },
      immediate: true
    }
  },
  created () {
    // 查询省
    this.getResourceDetaileByCode('')
  },
  mounted () {
  },
  methods: {
    // 切换最后一个
    lastCode (e) {
      // const code = this.formData.province + this.formData.city + this.formData.area + e
      this.$emit('getValue', e)
    },
    /*
        *
        *  @params:code 当前选择的代码
        *  @description: 联动查询城市字典,code 为空时查询所有省份
        *
        * */
    async getResourceDetaileByCode ($code) {
      this.$emit('getValue', $code)
      const res = await getAreaByCode({ code: $code })
      if (res.code === 200) {
        if (!$code) {
          this.deptCode.province = res.data
        } else if ($code.length === 2) {
          this.deptCode.city = res.data
        } else if ($code.length === 4) {
          this.deptCode.area = res.data
        } else {
          this.deptCode.street = res.data
        }
        return res.data
      }
    },

    /*
    *
    *  @params:code 当前选择的代码
    *  @description: 省份change
    *
    * */
    async changeProvice (code) {
      if (!code || String(code) === 'null') return
      await this.resetCityCode(1)
      this.getResourceDetaileByCode(code)
    },

    /*
    *
    *  @params:code 当前选择的代码
    *  @description: 市级change
    *
    * */

    async changecity (code) {
      if (!code || String(code) === 'null') return
      console.log('code', code)
      await this.resetCityCode(2, code)
      this.getResourceDetaileByCode(code)
    },

    /*
    *
    *  @params:code 当前选择的代码
    *  @description: 区、县change
    *
    * */
    async changearea (code) {
      if (!code || String(code) === 'null') return
      await this.resetCityCode(3, code)
      this.getResourceDetaileByCode(code)
    },
    /*
     *
     * @params：index
     *          1、省级 clear
     *          2. 市级 clear
     *          3. 区县 clear
     *
     * */
    async resetCityCode (index = 1) {
      if (index === 1) {
        this.$emit('getValue', '')
      }
      if (index === 2) {
        this.$emit('getValue', this.formData.province)
      }
      if (index === 3) {
        this.$emit('getValue', this.formData.city)
      }
      if (index === 4) {
        this.$emit('getValue', this.formData.area)
      }
      const resetList = ['province', 'city', 'area', 'street'].slice(index)
      await resetList.forEach(item => {
        this.deptCode[item] = []
        this.formData[item] = ''
      })
    }
  }
}
</script>

<style lang="less" scoped>
.w-150 {
  width: 150px;
}
</style>
