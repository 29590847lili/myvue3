<template>
  <!-- 忘记密码 -->
  <div class="login-bg">
    <div class="login-box">
      <!-- <img class="logo-img" src="../assets/logo_ccac.png" /> -->
      <div class="logo-img">{{$store.state.objectName}}</div>
      <Title title="忘记密码" class="m-t-20" />
      <div class="content-item">
        <div class="tip-box">
          <img src="../assets/icon-tip.png" alt="小提示">
          <span class="tip-tit">如无法接收短信可联系管理员为您重置密码</span>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="phone" label="手机号" class="phone-item">
            <el-input style="width: 214px" v-model="loginForm.phone" :maxlength="11" placeholder="请输入手机号" clearable />
            <div class="send" v-if="isSend" @click="handleSend()">{{(isSend && countdown) ? '获取验证码' : '重新获取'}}</div>
            <div class="send" v-else>{{countdown}}s</div>
          </el-form-item>
          <el-form-item prop="smsCode" label="验证码">
            <el-input v-model="loginForm.smsCode" :maxlength="6" placeholder="请输入验证码" :disabled="!isHaveSMSCode" clearable />
          </el-form-item>
          <el-form-item prop="password" label="新密码">
            <el-input v-model="loginForm.password" :maxlength="20" onkeyup="value=value.replace(/[^\x00-\xff]/g, '')" placeholder="16-20位，包含大小写字母、数字、特殊字符" :disabled="!isHaveSMSCode" clearable />
          </el-form-item>
          <el-form-item prop="newPassword" label="确认密码">
            <el-input v-model="loginForm.newPassword" type="password" :maxlength="20" onkeyup="value=value.replace(/[^\x00-\xff]/g, '')" placeholder="16-20位，包含大小写字母、数字、特殊字符" :disabled="!isHaveSMSCode" clearable />
          </el-form-item>
          <div class="login-submit">
            <el-button class="btn-style m-r-10" @click="postLogin()" type="primary" :disabled="!isHaveSMSCode">确定</el-button>
            <el-button class="btn-style" @click="handleCancel()">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  postCaptchaPassword,
  postUserPasswordSmsReset
} from '@/axios/systemManage'
export default {
  data () {
    const check = /^(?=.{16})(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[*?!&￥$%^#,./@";:><[\]}{\-=+_\\|》《。，、？’‘“”~ `]).*$/
    const checkPhone = /^1\d{10}/
    // 手机号校验
    const validatePhone = async (rule, value, callback) => {
      if (!value) {
        callback(new Error('手机号不可为空'))
      } else if (value.length < 11 || !checkPhone.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
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
    //  确认密码校验
    const validateConfirmPwd = async (rule, value, callback) => {
      const newPwd = this.loginForm.password
      const confirmPwd = this.loginForm.newPassword
      if (confirmPwd === '') {
        callback(new Error('请输入确认密码'))
      } else if (confirmPwd !== newPwd) {
        callback(new Error('两次的密码不一致，请核对后重新输入'))
      } else if (!check.test(confirmPwd)) {
        callback(new Error('密码需包含大小写字母，数字、特殊字符'))
      } else {
        callback()
      }
    }
    return {
      isSend: true, // 是否发送信息
      timer: null,
      isHaveSMSCode: false, // 是否获取验证码
      countdown: 60,
      loginForm: {
        phone: '', // 手机号
        smsCode: '', // 验证码
        password: '', // 新密码
        newPassword: '', // 确认密码
        uuid: ''
      },
      rules: {
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        smsCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validateNewPwd, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validateConfirmPwd, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    document.onkeydown = (e) => {
      const key = window.event.keyCode
      if (key === 13 && !localStorage.getItem('Authorization')) this.postLogin()
    }
  },
  methods: {
    async handleSend () {
      if (!this.loginForm.phone) {
        this.$message.error('请输入手机号')
        return
      }
      this.isHaveSMSCode = false
      this.countdown = 60
      this.timer = null
      this.isSend = false
      this.timer = window.setInterval(() => {
        if (!this.countdown) {
          this.isSend = true
          window.clearInterval(this.timer)
          return
        }
        this.countdown -= 1
      }, 1000)
      const res = await postCaptchaPassword({
        phone: this.loginForm.phone,
        appId: this.$store.state.appId,
        businessType: 'e3f196c2a' // 增加短信模板
      })
      this.isHaveSMSCode = true
      if (res.code === 200) {
        this.$message.success('验证码已放至您手机，请注意查收')
      }
    },
    handleCancel () {
      this.$router.go(-1)
    },
    // 修改密码
    async postLogin () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const { newPassword, phone, smsCode } = this.loginForm
          const options = {
            newPassword,
            phone,
            smsCode,
            appId: this.$store.state.appId
          }
          const res = await postUserPasswordSmsReset(options)
          if (res.code === 200) {
            this.$message.success('密码已重置')
            this.handleCancel()
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-bg {
  width: 100%;
  height: 100%;
  position: relative;
  background: #e8f3ff;
  .login-box {
    width: 720px;
    min-width: 720px;
    height: 472px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 2px 8px 0px rgba(0, 76, 161, 0.1);
    background: rgba(255, 255, 255, 0.9);
    border-radius: 4px;
    padding: 0 20px 20px;
    box-sizing: border-box;
    .logo-img {
      position: absolute;
      top: -110px;
      left: calc((100% - 529px) / 2);
      width: 529px;
      text-align: center;
      font-size: 32px;
      font-weight: bold;
      color: #306be2;
    }
    .content-item {
      flex: 1;
      width: 100%;
      position: relative;
      padding: 10px 100px 40px;
      box-sizing: border-box;
      .tip-box {
        display: flex;
        align-items: center;
        margin-left: 100px;
        margin-bottom: 8px;
        img {
          width: 13px;
          height: 13px;
          margin-right: 6px;
        }
        .tip-tit {
          color: #666;
          font-size: 12px;
        }
      }
      /deep/ .el-form {
        margin: 0 auto;
        text-align: left;
        .el-form-item {
          margin-bottom: 35px;
          .el-form-item__label {
            color: #333;
          }
          .el-form-item__error {
            padding-top: 12px;
            color: #f33d33;
          }
          .el-form-item__content {
            width: 340px;
            .el-input {
              height: 40px;
              .el-input__inner {
                height: 40px;
                line-height: 40px;
              }
            }
          }
        }
        .phone-item {
          .el-form-item__content {
            display: flex;
            align-items: center;
            .send {
              width: 110px;
              height: 40px;
              margin-left: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              background: #f1f4f9;
              border-radius: 4px;
              border: 1px solid #306be2;
              font-size: 12px;
              color: #306be2;
            }
          }
        }
      }
      /deep/ .login-submit {
        position: relative;
        display: flex;
        margin-left: 100px;
        .btn-style {
          width: 90px;
          height: 32px;
        }
      }
    }
  }
}
</style>
