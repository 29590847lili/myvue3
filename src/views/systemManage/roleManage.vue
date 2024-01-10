<template>
  <!-- 角色管理 -->
  <div>
    <Butns v-model="butns" />
    <!-- 搜索 -->
    <div class="search-bg">
      <YcSearchInput v-model="search.roleName" title="角色名称" />
      <YcSearchSelect v-model="search.roleStatus" title="状态" :option="statusList" />
      <div class="search-submit">
        <el-button type="primary" class="m-r-10" @click="getTableList(1)">查询</el-button>
        <el-button @click="handleReset()">重置</el-button>
      </div>
    </div>
    <!-- 列表 -->
    <div class="table-bg">
      <div class="table-option">
        <div class="left">
          <el-button @click="handleAdd()" type="primary">添加</el-button>
        </div>
        <div class="right"></div>
      </div>
      <el-table :data="tableData">
        <el-table-column type="index" label="序号" min-width="80" align="center">
          <template slot-scope="scope">
            {{ (search.page.current - 1) * search.page.size + (scope.$index + 1) }}
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" min-width="100" />
        <el-table-column prop="remark" label="角色描述" min-width="120" />
        <el-table-column prop="createdTime" label="创建时间" min-width="160" />
        <el-table-column prop="createdTime" label="更新时间" min-width="160" />
        <el-table-column prop="roleName" label="状态" min-width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2" @change="postUpdateRoleStatus(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" fixed="right" min-width="130">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="postRemoveRoleById(scope.row)">删除</el-button>
            <el-button type="text" @click="handlePower(scope.row)">权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 翻页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.page.current" :page-sizes="$store.state.pageSizes" :page-size="search.page.size" :layout="$store.state.layout" :total="tableTotal">
      </el-pagination>
    </div>
    <!-- 添加/编辑 -->
    <el-dialog :title="roleForm.role.roleId ? '编辑角色' : '添加角色'" :visible.sync="dialog.addOrEdit" width="500px" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="dialog-main">
        <el-form :model="roleForm" :rules="roleFormRules" ref="roleForm" label-width="100px">
          <el-form-item label="角色名称" prop="role.roleName">
            <el-input v-model="roleForm.role.roleName" :maxlength="20" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="角色描述" prop="remark">
            <el-input v-model="roleForm.role.remark" type="textarea" :autosize="{ minRows: 3, maxRows: 6}"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.addOrEdit = false">取 消</el-button>
        <el-button @click="roleSubmit()" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postQueryRoleList, postCreateRole, postUpdateRoleDetail, postUpdateRoleStatus, postRemoveRoleById } from '@/axios/systemManage.js'
const condition = {
  roleName: '', // 角色名
  roleStatus: ''
}
export default {
  data () {
    return {
      butns: [], // 权限按钮
      search: {
        ...condition,
        page: {
          current: 1,
          size: this.$store.state.pageSize
        }
      },
      // 列表
      tableTotal: 0,
      tableData: [],
      // 添加 编辑 角色
      roleForm: {
        role: {
          roleName: '', // 角色名称
          remark: '' // 角色描述
        },
        menuIds: []
      },
      roleFormRules,
      // 弹窗
      dialog: {
        addOrEdit: false
      },
      // 枚举
      statusList
    }
  },
  created () {
    this.getTableList()
  },
  methods: {
    // 获取列表数据
    async getTableList (page) {
      if (page) this.search.page.current = page
      const res = await postQueryRoleList(this.search)
      if (res.code === 200) {
        this.tableData = res.data.records
        this.tableTotal = res.data.total
      }
    },
    // 角色 新增 编辑 提交
    async roleSubmit () {
      this.$refs.roleForm.validate(async (valid) => {
        if (valid) {
          if (this.roleForm.role.roleId) { // 编辑
            const res = await postUpdateRoleDetail(this.roleForm)
            if (res.code === 200) {
              this.getTableList()
              this.dialog.addOrEdit = false
            }
          } else {
            const res = await postCreateRole(this.roleForm)
            if (res.code === 200) {
              this.getTableList()
              this.dialog.addOrEdit = false
            }
          }
        }
      })
    },
    /**
     * 列表操作
     */
    // 删除
    async postRemoveRoleById (row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async () => {
        const params = { roleId: row.roleId }
        const res = await postRemoveRoleById(params)
        if (res.code === 200) {
          this.getTableList()
          this.$message.success('删除成功')
        }
      }).catch(() => { })
    },
    // 角色启用/禁用
    async postUpdateRoleStatus (row) {
      const params = { roleId: row.roleId, status: row.status }
      const res = await postUpdateRoleStatus(params)
      if (res.code === 200) {
        this.$message.success('修改状态成功')
        this.getTableList()
      }
    },
    // 添加
    handleAdd () {
      this.dialog.addOrEdit = true
      this.roleForm = {
        role: {
          roleName: '', // 角色名称
          remark: '' // 角色描述
        },
        menuIds: []
      }
      this.$nextTick(() => { // 重置表单验证
        this.$refs.roleForm.resetFields()
      })
    },
    // 重置
    handleReset () {
      this.search = {
        ...condition,
        page: {
          current: 1,
          size: this.$store.state.pageSize
        }
      }
      this.getTableList()
    },
    // 编辑
    handleEdit (row) {
      this.dialog.addOrEdit = true
      this.$nextTick(() => { // 重置表单验证
        this.$refs.roleForm.resetFields()
      })
      this.$nextTick(() => {
        this.roleForm = {
          role: {
            roleId: row.roleId,
            roleName: row.roleName, // 角色名称
            remark: row.remark // 角色描述
          },
          menuIds: [],
          operationStatus: 0
        }
      })
    },
    // 权限
    handlePower (row) {
      localStorage.setItem('roleItem', JSON.stringify(row))
      this.$router.push('/systemManage/permissionSetting')
    },
    // 分页
    handleSizeChange (val) {
      this.search.page.current = 1
      this.search.page.size = val
      this.getTableList()
    },
    handleCurrentChange (val) {
      this.search.page.current = val
      this.getTableList()
    }
  }
}
// 表单验证
const roleFormRules = {
  'role.roleName': [
    { required: true, message: '请输入角色名称', trigger: 'blur' }
  ]
}
const statusList = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 2 }
]
</script>

<style lang="less" scoped>
</style>
