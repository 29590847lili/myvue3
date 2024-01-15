<template>
  <div class="tree-block">
    <el-checkbox v-model="ischeckAll" class="ischeck-all" @change="handleCheckAllChange">全选</el-checkbox>
    <div class="tree-title">
      <div class="one">一级</div>
      <div class="two">二级</div>
      <div class="three">功能</div>
    </div>
    <div v-if="options && options.length" class="treeBox">
      <el-checkbox-group v-model="treeValue" @change="setValue()">
        <div class="treeItemOne" v-for="(aItem) in options" :key="aItem.menuId">
          <div class="aItem-left">
            <!-- 一级 -->
            <el-checkbox :label="aItem.menuId" @change="handleCheckedCountryAllChange(aItem, $event)">{{aItem.menuName}}</el-checkbox>
          </div>
          <div class="aItem-right" v-if="aItem.children && aItem.children.length">
            <div class="treeItemTwo" v-for="bItem in aItem.children" :key="bItem.menuId">
              <div class="bItem-left">
                <!-- 二级 -->
                <el-checkbox :label="bItem.menuId" @change="handleCheckedCountryAllChange(bItem, $event, aItem)">{{bItem.menuName}}</el-checkbox>
              </div>
              <div class="bItem-right" v-if="bItem.children && bItem.children.length">
                <!-- 三级 -->
                <label class="list" v-for="cItem in bItem.children" :key="cItem.menuId">
                  <el-checkbox :label="cItem.menuId" @change="selectParent(bItem, aItem, $event)">{{cItem.menuName}}</el-checkbox>
                </label>
              </div>
            </div>
          </div>
        </div>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      echo: true, // 是否渲染
      ischeckAll: false,
      treeValue: [] // 返回结果数据
    }
  },
  props: {
    modelValue: {
      default: () => []
    },
    options: {
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  // model: {
  //   prop: 'value',
  //   event: 'setValue'
  // },
  computed: {
    // 获取整棵树节点长度
    optionnsLng () {
      let num = 0
      if (this.options && this.options.length) {
        this.options.map(aItem => {
          num++
          if (aItem.children && aItem.children.length) {
            aItem.children.map(bItem => {
              num++
              if (bItem.children && bItem.children.length) {
                bItem.children.map(cItem => {
                  num++
                })
              }
            })
          }
        })
      }
      return num
    }
  },
  watch: {
    modelValue: {
      handler (value) {
        this.treeValue = value
        if (this.echo && value.length) {
          this.setMenuIds(value)
        }
        if (this.optionnsLng === this.treeValue.length) {
          this.ischeckAll = true
        } else {
          this.ischeckAll = false
        }
      },
      deep: true
    }
  },
  methods: {
    setValue () {
      this.$emit('update:modelValue', [...new Set(this.treeValue)])
    },
    // 根据末级按钮权限回显菜单
    setMenuIds (value) {
      const result = []
      this.options.map(aItem => { // 一级
        if (aItem.children && aItem.children.length) {
          aItem.children.map(bItem => { // 二级
            if (value.includes(bItem.menuId)) {
              result.push(aItem.menuId)
            }
            if (bItem.children && bItem.children.length) {
              bItem.children.map(cItem => { // 三级
                if (value.includes(cItem.menuId)) {
                  result.push(bItem.menuId)
                  result.push(aItem.menuId)
                }
              })
            }
          })
        }
      })
      const output = [...value, ...result]
      this.treeValue = [...new Set(output)]
      this.$emit('setValue', this.treeValue)
      this.echo = false
    },
    // 全选
    handleCheckAllChange (event) {
      // 一级change事件
      this.ischeckAll = event
      this.treeValue = []
      for (let i = 0; i < this.options.length; i++) {
        // 全选
        if (event) {
          this.treeValue.push(this.options[i].menuId)
          for (let j = 0; j < this.options[i].children.length; j++) {
            // 三级全选反选
            this.treeValue.push(this.options[i].children[j].menuId)
            const JChildren = this.options[i].children[j]
            if (JChildren.children && JChildren.children.length) {
              for (let k = 0; k < JChildren.children.length; k++) {
                this.treeValue.push(JChildren.children[k].menuId)
              }
            }
          }
        }
      }

      this.$emit('setValue', [...new Set(this.treeValue)])
    },
    // 选中 取消节点
    handleCheckedCountryAllChange (aItem, event, parItem) {
      const checkData = []
      if (event) { // 选中
        const AChildren = aItem.children
        if (AChildren && AChildren.length) {
          for (let i = 0; i < AChildren.length; i++) {
            checkData.push(AChildren[i].menuId)
            if (AChildren[i].children) {
              for (let j = 0; j < AChildren[i].children.length; j++) {
                checkData.push(AChildren[i].children[j].menuId)
              }
            }
          }
        }
        if (parItem !== undefined) {
          checkData.push(parItem.menuId)
        }
        this.treeValue = [...this.treeValue, ...checkData]
      } else { // 未选中
        const cancelData = []
        const AChildren = aItem.children
        if (AChildren && AChildren.length) {
          for (let i = 0; i < AChildren.length; i++) {
            cancelData.push(AChildren[i].menuId)
            if (AChildren[i].children) {
              for (let j = 0; j < AChildren[i].children.length; j++) {
                cancelData.push(AChildren[i].children[j].menuId)
              }
            }
          }
          this.treeValue = this.deleteData(this.treeValue, cancelData)
        }
      }
      if (parItem) { // 反选父级
        this.selectParent(parItem)
      }
    },
    // 反选父级
    selectParent (bItem, aItem, event) {
      // 选中父节点
      if (bItem) {
        // 父id
        const parentId = bItem.menuId
        if (event) {
          this.treeValue.push(parentId)
        }
      }
      // 选中祖节点
      if (aItem) {
        // 祖id
        const ancestorId = aItem.menuId
        if (event) {
          this.treeValue.push(ancestorId)
        }
      }
    },
    // 判断数组是否包含另一个数组
    checkArr (arr1, arr2) {
      const arr3 = []
      for (var i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) > -1) {
          arr3.push(arr2[i])
        }
      }
      if (arr3.length === arr2.length) {
        return true
      } else {
        return false
      }
    },
    // 数组删除重复项
    deleteData (arr1, arr2) {
      const temp = []
      const temparray = []
      for (let i = 0; i < arr2.length; i++) {
        temp[arr2[i]] = true
      }
      for (let i = 0; i < arr1.length; i++) {
        if (!temp[arr1[i]]) {
          temparray.push(arr1[i])
        }
      }
      return temparray
    }
  }
}
</script>

<style lang="less" scoped>
.ischeck-all {
  padding: 0 0 10px 20px;
}
.tree-title {
  height: 50px;
  display: flex;
  align-items: center;
  border: 1px solid #ebeef5;
  border-bottom: 0 none;
  background: #fcfdff;
  div {
    padding-left: 20px;
    height: 50px;
    line-height: 50px;
  }
  .one {
    min-width: 200px;
    border-right: 1px solid #ebeef5;
  }
  .two {
    min-width: 200px;
    border-right: 1px solid #ebeef5;
  }
}
.treeBox {
  border: 1px solid #ebeef5;
  border-bottom: 0 none;
  .treeItemOne {
    display: flex;
    border-bottom: 1px solid #ebeef5;
    .aItem-left {
      width: 200px;
      min-width: 200px;
      display: flex;
      align-items: center;
      align-items: center;
      border-right: 1px solid #ebeef5;
      padding-left: 20px;
    }
    .aItem-right {
      width: calc(100% - 200px);
      .treeItemTwo {
        display: flex;
        width: 100%;
        border-bottom: 1px solid #ebeef5;
        .bItem-left {
          display: flex;
          min-height: 50px;
          padding-left: 20px;
          align-items: center;
          width: 200px;
          min-width: 200px;
          border-right: 1px solid #ebeef5;
        }
        .bItem-right {
          display: flex;
          flex-wrap: wrap;
          padding-left: 20px;
          .list {
            height: 50px;
            display: flex;
            align-items: center;
            margin-right: 20px;
          }
        }
        &:last-child {
          border-bottom: 0 none;
        }
      }
    }
  }
}
.el-checkbox {
  font-weight: normal !important;
}
</style>
