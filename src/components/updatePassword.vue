<template>
  <div class="update-password-container" v-if="singleFunction.updatePassword">
    <Title title="修改密码" />
    <div class="form-container">
      <div class="form-content">
        <el-form :model="formData" ref="passwordForm" :rules="formDataRules" label-width="90px" class="demo-ruleForm">
          <el-form-item label="原始密码" prop="oldPassword">
            <el-input v-model="formData.oldPassword" type="password" show-password class="w-340" maxlength="20" placeholder="请输入原始密码" />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="formData.newPassword" type="password" show-password class="w-340" maxlength="20" placeholder="16-20位，包含大小写字母、数字、特殊字符" />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPwd">
            <el-input v-model="formData.confirmPwd" type="password" show-password class="w-340" maxlength="20" placeholder="16-20位，包含大小写字母、数字、特殊字符" />
          </el-form-item>
        </el-form>
        <div class="btn-box">
          <el-button type="primary m-r-10" @click="postPasswordModify()">提交</el-button>
          <el-button @click="handleCancel()">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { postPasswordModify } from '@/axios/systemManage'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    const check = /^(?=.{16})(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[*?!&￥$%^#,./@";:><[\]}{\-=+_\\|》《。，、？’‘“”~ `]).*$/
    const validateNewPwd = async (rule, value, callback) => {
      if (!value) {
        callback(new Error('新密码不可为空'))
      } else if (value.length < 16 && !check.test(value)) {
        callback(new Error('新密码至少16位'))
      } else if (!check.test(value)) {
        callback(new Error('密码需包含大小写字母，数字、特殊字符'))
      } else {
        callback()
      }
    }
    const validateConfirmPwd = async (rule, value, callback) => {
      const newPwd = this.formData.newPassword
      const confirmPwd = this.formData.confirmPwd
      if (confirmPwd === '') {
        callback(new Error('请再次输入密码'))
      } else if (confirmPwd !== newPwd) {
        callback(new Error('您两次密码输入的不一致，请重新核对'))
      } else if (!check.test(confirmPwd)) {
        callback(new Error('密码需包含大小写字母，数字、特殊字符'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        userId: '',
        oldPassword: '',
        newPassword: '',
        confirmPwd: ''
      },
      formDataRules: {
        oldPassword: [
          { required: true, message: '请输入原始密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validateNewPwd, trigger: 'blur' }
        ],
        confirmPwd: [
          { required: true, validator: validateConfirmPwd, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    // 监听路由变化后关闭“修改密码”区域
    '$route.path': {
      handler (val) {
        this.commitPasswordStatus(false)
      },
      immediate: true
    }
  },
  computed: {
    ...mapState(['singleFunction'])
  },
  methods: {
    ...mapMutations(['commitPasswordStatus']),
    handleCancel () {
      this.commitPasswordStatus(false)
    },
    // 修改密码
    async postPasswordModify () {
      this.$refs.passwordForm.validate(async (valid) => {
        if (valid) {
          this.formData.userId = this.$store.state.userInfo.userId
          const res = await postPasswordModify(this.formData)
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.$router.push('/')
            this.$store.state.userInfo = {}
            this.$store.state.menus = []
            this.$store.state.menuPaths = []
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.update-password-container {
  position:absolute;
  top: 16px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  z-index:999;
  width: calc(100% - 40px);
  height: calc(100% - 36px);
  background: #fff;
  padding: 0 16px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  .form-container {
    margin-top: 6px;
    width: 100%;
    display: flex;
    justify-content: center;
    .form-content {
      width: 400px;
      /deep/ .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
        margin-bottom: 24px;
      }
      .w-340 {
        width: 340px;
      }
      .btn-box {
        width: 100%;
        padding-left: 90px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
