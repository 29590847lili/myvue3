<template>
  <div class="p-t-20">
    <div class="table-bg">
      <div class="title-box">
        <div class="left">角色名称</div>
        <div class="right">系统管理员</div>
      </div>
      <PowerItem v-model="postCreateRoleData.menuIds" :options="data" />
    </div>
    <SubmitBox>
      <el-button @click="$router.go(-1)">取 消</el-button>
      <el-button class="m-l-20" type="primary" @click="saveClick()">保存</el-button>
    </SubmitBox>
  </div>
</template>

<script>
import { getMenuTreeList, postUpdateRoleDetail, postQueryRoleById } from '@/axios/systemManage'
import SubmitBox from './submitBox.vue'
import PowerItem from './powerItem/index.vue'
export default {
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      postCreateRoleData // 新增、编辑角色表单
    }
  },
  created () {
    this.getMenuTreeList()
  },
  methods: {
    async getMenuTreeList () {
      const res = await getMenuTreeList()
      if (res.code === 200) {
        res.data.map(item => {
          item.menuName = item.menuName.split('(')[0]
          item.children.map(cItem => {
            cItem.menuName = cItem.menuName.split('(')[0]
          })
        })
        this.data = res.data
        this.getQueryRoleById()
      }
    },
    async getQueryRoleById () {
      const roleItem = JSON.parse(localStorage.getItem('roleItem'))
      const res = await postQueryRoleById({ roleId: roleItem.roleId })
      if (res.code === 200) {
        this.postCreateRoleData = res.data
      }
    },
    // 保存
    async saveClick () {
      this.postCreateRoleData.role = JSON.parse(localStorage.getItem('roleItem'))
      this.postCreateRoleData.operationStatus = 1 // 编辑权限时固定传1 角色基本信息传0
      const res = await postUpdateRoleDetail(this.postCreateRoleData)
      if (res.code === 200) {
        this.$message.success('保存成功!')
        this.$router.go(-1)
      }
    }
  },
  components: {
    SubmitBox,
    PowerItem
  }
}
const postCreateRoleData = { // 新增、编辑角色表单
  menuIds: [], // 角色菜单权限
  role: {}
}
</script>

<style lang="less" scoped>
.table-bg {
  min-height: 88vh;
  padding: 20px;
  margin-bottom: 100px;
  .title-box {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      font-size: 16px;
      color: #333;
      font-weight: bold;
      &::before {
        display: inline-block;
        content: '';
        width: 3px;
        height: 13px;
        background: #306BE2;
        margin-right: 10px;
      }
    }
    .right {
      font-size: 13px;
      font-weight: bold;
    }
  }
}
// /deep/ .my-tree{border:1px solid #EBEEF5;
//   .el-tree-node:last-child{border-bottom:0 none}
//   &>.el-tree-node{
//     &>.el-tree-node__content{height:50px;border-bottom:1px solid #EBEEF5;position:relative;
//       &::after{content:'';width:1px;height:100%;border-right:1px solid #EBEEF5;position:absolute;left:160px;top:0;}
//       &::before{content:'';width:1px;height:100%;border-right:1px solid #EBEEF5;position:absolute;left:320px;top:0;}
//     }
//     &>.el-tree-node__children{
//       &>.el-tree-node{
//         &>.el-tree-node__content{padding-left:160px!important;height:50px;border-bottom:1px solid #EBEEF5;position:relative;
//           &::after{content:'';width:1px;height:100%;border-right:1px solid #EBEEF5;position:absolute;left:160px;top:0;}
//           &::before{content:'';width:1px;height:100%;border-right:1px solid #EBEEF5;position:absolute;left:320px;top:0;}
//         }
//         &>.el-tree-node__children{padding-left:320px;position:relative;border-bottom:1px solid #EBEEF5;display:flex; flex-wrap:wrap;
//            &::after{content:'';width:1px;height:100%;border-right:1px solid #EBEEF5;position:absolute;left:160px;top:0;}
//            &::before{content:'';width:1px;height:100%;border-right:1px solid #EBEEF5;position:absolute;left:320px;top:0;}
//            &>.el-tree-node{height:50px;display:flex;align-items:center;
//             &>.el-tree-node__content{padding-left:0!important;}
//            }
//         }
//       }
//     }
//   }
// }
</style>
