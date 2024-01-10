<template>
  <!-- 账号管理 -->
  <div>
    <Butns v-model="butns" />
    <!-- 搜索 -->
    <div class="search-bg">
      <YcSearchInput v-model="search.loginAccount" title="账号名称" />
      <YcSearchInput v-model="search.username" title="真实姓名" />
      <YcSearchInput v-model="search.phonenumber" title="手机号" />
      <YcSearchSelect v-model="search.status" title="状态" :option="statusList" />
      <div class="search-submit">
        <el-button type="primary" class="m-r-10" @click="getTableList(1)">查询</el-button>
        <el-button @click="clearSearch()">重置</el-button>
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
            {{ (search.pageNum - 1) * search.pagesize + (scope.$index + 1) }}
          </template>
        </el-table-column>
        <el-table-column prop="loginAccount" label="账号名称" min-width="100" />
        <el-table-column prop="userName" label="真实姓名" min-width="80" />
        <el-table-column prop="phonenumber" label="手机号" min-width="100" />
        <el-table-column prop="roleName" label="角色名称" min-width="120" show-overflow-tooltip />
        <el-table-column prop="createdTime" label="创建时间" min-width="160" />
        <el-table-column prop="status" label="状态" width="80">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2" @change="postAccountUseUpdateStatus(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" fixed="right" min-width="110">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="handleResetPassword(scope.row)">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 翻页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="$store.state.pageSizes" :page-size="search.pagesize" :layout="$store.state.layout" :total="tableTotal">
      </el-pagination>
    </div>
    <!-- 添加/编辑账号 -->
    <el-dialog :title="this.userFormData.userId ? '编辑账号' : '添加账号'" :visible.sync="dialog.addOrEdit" width="480px" :close-on-click-modal="false" :close-on-press-escape="false" @close="handleClose()">
      <div class="dialog-main">
        <el-form :model="userFormData" :rules="userFormDataRules" ref="userFormData" label-width="110px">
          <el-form-item label="账号名称" prop="loginAccount">
            <el-input v-model="userFormData.loginAccount" class="w-300" maxlength="20" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="userName">
            <el-input v-model="userFormData.userName" class="w-300" maxlength="10" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="手机号" prop="phonenumber">
            <el-input v-model="userFormData.phonenumber" class="w-300" placeholder="手机号可用于登录及找回密码" maxlength="11" />
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select v-model="userFormData.roleId" class="w-300" placeholder="请选择">
              <el-option v-for="(item, index) in postQueryRoleListData" :key="index" :label="item.roleName" :value="item.roleId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="userFormData.status" class="w-300" placeholder="请选择">
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>初始密码：123@qwe.asd</el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button @click="postUserRegister()" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postUserDataPage, postUserRegister, postPasswordReset, postQueryRoleList, postSaveUserRole, postUpdateUserRoleByUserId, postUserUpdate, postAccountUseUpdateStatus } from '@/axios/systemManage.js'
import { validateMobile } from '@/utils/FormValidation.js'
const condition = {
  loginAccount: '', // 账号名
  username: '', // 真实姓名
  phonenumber: '', // 手机号
  status: '' // 状态
}
export default {
  data () {
    return {
      butns: [], // 权限按钮
      search: {
        ...condition,
        pageNum: 1,
        pagesize: this.$store.state.pageSize // 一定要取store中pageSize
      },
      // 列表
      tableTotal: 0,
      tableData: [],
      // 新增编辑
      userFormData: {
        userApps: [
          {
            appId: this.$store.state.appId
          }
        ],
        loginAccount: '', // 账号名称
        userName: '', // 真实姓名
        phonenumber: '', // 手机号
        roleId: '', // 角色
        status: '', // 状态
        password: '123@qwe.asd' // 默认密码
      },
      userFormDataRules, // 新增编辑表单验证
      postQueryRoleListData: [], // 角色下拉选项
      dialog: {
        addOrEdit: false
      },
      // 枚举
      statusList
    }
  },
  created () {
    this.getTableList()
    this.postQueryRoleList() // 获取角色列表
  },
  methods: {
    // 获取列表数据
    async getTableList (page) {
      if (page) this.search.pageNum = 1
      const res = await postUserDataPage(this.search)
      if (res.code === 200) {
        this.tableData = res.data.records
        this.tableTotal = res.data.total
      }
    },
    // 账号启用/禁用
    async postAccountUseUpdateStatus (row) {
      const params = { userId: row.userId, status: row.status }
      const res = await postAccountUseUpdateStatus(params)
      if (res.code === 200) {
        this.$message.success('修改状态成功')
        this.getTableList()
      }
    },
    // 新增编辑账号提交
    async postUserRegister () {
      this.$refs.userFormData.validate(async (valid) => {
        if (valid) {
          if (this.userFormData.userId) { // 编辑
            const res = await postUserUpdate(this.userFormData)
            if (res.code === 200) {
              const params = { roleId: this.userFormData.roleId, userId: res.data.userId }
              this.postUpdateUserRoleByUserId(params)
            }
          } else { // 新增
            const res = await postUserRegister(this.userFormData)
            if (res.code === 200) {
              const params = { roleId: this.userFormData.roleId, userId: res.data.userId }
              this.postSaveUserRole(params)
            }
          }
        }
      })
    },
    // 新增账号时 更新角色
    async postSaveUserRole (params) {
      const cRes = await postSaveUserRole(params)
      if (cRes.code === 200) {
        this.getTableList()
        this.$message.success('操作成功')
        this.handleClose()
      }
    },
    // 编辑账号时 更新角色
    async postUpdateUserRoleByUserId (params) {
      const cRes = await postUpdateUserRoleByUserId(params)
      if (cRes.code === 200) {
        this.getTableList()
        this.$message.success('操作成功')
        this.handleClose()
      }
    },
    // 获取角色列表
    async postQueryRoleList () {
      const params = {
        roleStatus: 1,
        page: {
          current: 1,
          size: 10
        }
      }
      const res = await postQueryRoleList(params)
      if (res.code === 200) {
        this.postQueryRoleListData = res.data.records
      }
    },
    // 重置密码
    async handleResetPassword (row) {
      this.$confirm(`确认将账号“${row.loginAccount}”的密码重置为初始密码123@qwe.asd吗？`, '重置密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async () => {
        const params = {
          newPassword: '123@qwe.asd',
          userId: row.userId
        }
        const res = await postPasswordReset(params)
        if (res.code === 200) {
          this.$message.success('重置成功！')
        }
      }).catch(() => { })
    },
    // 添加账号
    handleAdd () {
      this.dialog.addOrEdit = true
      this.$nextTick(() => { // 重置表单验证
        this.$refs.userFormData.clearValidate()
      })
    },
    /**
     * 列表操作
     */
    // 编辑账号
    handleEdit (row) {
      this.userFormData = JSON.parse(JSON.stringify(row))
      this.dialog.addOrEdit = true
      setTimeout(() => {
        this.$refs.userFormData.clearValidate()
      }, 100)
    },
    // 重置
    clearSearch () {
      this.search = {
        ...condition,
        pageNum: 1,
        pagesize: this.$store.state.pageSize
      }
      this.getTableList()
    },
    // 分页
    handleSizeChange (val) {
      this.search.pageNum = 1
      this.search.pagesize = val
      this.getTableList()
    },
    handleCurrentChange (val) {
      this.search.pageNum = val
      this.getTableList()
    },
    // 关闭弹窗
    handleClose () {
      this.dialog.addOrEdit = false
      // 重置表单数据
      this.userFormData = {
        userApps: [
          {
            appId: this.$store.state.appId
          }
        ],
        loginAccount: '', // 账号名称
        userName: '', // 真实姓名
        phonenumber: '', // 手机号
        roleId: '', // 角色
        status: '', // 状态
        password: '123@qwe.asd' // 默认密码
      }
    }
  }
}
const statusList = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 2 }
]
// 新增编辑表单验证
const userFormDataRules = {
  loginAccount: [
    { required: true, message: '请输入账号名称', trigger: 'blur' }
  ],
  userName: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' }
  ],
  phonenumber: [
    { required: true, validator: validateMobile, trigger: 'blur' }
  ],
  roleId: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' }
  ]
}
</script>

<style lang="less" scoped>
</style>
