<template>
  <!-- 弹窗 -->
  <el-dialog title="修改密码" append-to-body :visible.sync="dialog.one" width="520px" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
    <el-form :model="formData" ref="formData" :rules="formDataRules" label-width="102px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="formData.oldPassword" :maxlength="20" type="password" show-password onkeyup="value=value.replace(/[^\x00-\xff]/g, '')"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="formData.newPassword" :maxlength="20" type="password" show-password @input="btn('newPassword')" onkeyup="value=value.replace(/[^\x00-\xff]/g, '')"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPwd">
        <el-input v-model="formData.confirmPwd" :maxlength="20" type="password" show-password @input="btn('confirmPwd')" onkeyup="value=value.replace(/[^\x00-\xff]/g, '')"></el-input>
      </el-form-item>
      <span style="font-size: 15px;">新密码需16-20位，包含大小写字母、数字、特殊字符</span>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="getPassWordType()">取 消</el-button>
      <el-button type="primary" @click="postPasswordModify()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { postPasswordModify, isUpdatePassword } from '@/axios/systemManage'
import { getUserCurrent } from '@/axios/users'
// import eventBus from './EventBus'
export default {
  data () {
    const check = /^(?=.{16})(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[*?!&￥$%^#,./@";:><[\]}{\-=+_\\|》《。，、？’‘“”~ `]).*$/
    // 密码校验
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
    const validateconfirmPwd = async (rule, value, callback) => {
      const newpwd = this.formData.newPassword
      const confirmPwd = this.formData.confirmPwd
      if (confirmPwd === '') {
        callback(new Error('请再次输入密码'))
      } else if (confirmPwd !== newpwd) {
        callback(new Error('您两次密码输入的不一致，请重新核对'))
      } else if (!check.test(confirmPwd)) {
        callback(new Error('密码需包含大小写字母，数字、特殊字符'))
      } else {
        callback()
      }
    }
    return {
      formData: { // 修改密码
        userId: '', // 用户名
        oldPassword: '', // 旧密码
        newPassword: '', // 新密码
        confirmPwd: '' // 确认密码
      },
      userId: {},
      dialog: {
        one: false
      },
      formDataRules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validateNewPwd, trigger: 'blur' }
        ],
        confirmPwd: [
          { required: true, validator: validateconfirmPwd, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserCurrent()
  },
  methods: {
    // 获取用户信息 userId
    async getUserCurrent () {
      const res = await getUserCurrent()
      if (res.code === 200) {
        this.$store.state.userInfo = res.data
        const userId = res.data.userId
        this.userId = userId
        this.getIsUpdatePassword(userId)
      }
    },
    async getIsUpdatePassword (userId) {
      const res = await isUpdatePassword(userId)
      if (res.code === 200) {
        // 是否需要修改密码 true 修改false 不修改
        if (res.data === true) {
          this.getPassWordType()
        } else { // 去调用协议的弹窗
          // eventBus.$emit('pushMsg')
        }
      }
    },
    getPassWordType () {
      this.$confirm('为了您的账号安全，建议您修改密码，如您未修改密码，将无法继续登录', '温馨提示', {
        confirmButtonText: '去修改',
        cancelButtonText: '退出',
        closeOnClickModal: false,
        showClose: false,
        closeOnPressEscape: false
      }).then(() => {
        this.dialog.one = true
      }).catch(() => {
        this.$router.push('/')
      })
    },
    // 修改密码
    async postPasswordModify () {
      this.$refs.formData.validate(async (valid) => {
        if (valid) {
          // 新密码不能和原密码一致
          if (this.formData.oldPassword === this.formData.newPassword) {
            this.$message.error('新密码不能和原密码一致')
          } else {
            this.formData.userId = this.$store.state.userInfo.userId
            this.formData.appId = this.$store.state.appId
            this.formData.verification = this.$store.state.userInfo.verification
            const res = await postPasswordModify(this.formData)
            if (res.code === 200) {
              this.$message.success('修改成功')
              this.$router.push('/')
              this.$store.state.userInfo = {}
              this.$store.state.menus = []
              this.$store.state.menuPaths = []
            }
          }
        }
      })
    },
    btn (type) {
      if (type === 'newPassword') {
        this.$refs.formData.validateField('confirmPwd')
      } else {
        this.$refs.formData.validateField('newPassword')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
