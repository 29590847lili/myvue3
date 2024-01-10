<template>
  <div class="login-bg">
    <div class="login-box">
      <div class="content-item">
        <div class="logo">
          <img class="logo-img" src="../assets/logo.png" alt="logo">
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="con-zhanghao" ref="username" :maxlength="20" placeholder="请输入账号或绑定的手机号" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" prefix-icon="icon-mima" type="password" ref="password" show-password :maxlength="20" placeholder="请输入登录密码" />
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input class="captcha" v-model="loginForm.captcha" prefix-icon="icon-yanzhengma" ref="captcha" :maxlength="4" placeholder="请输入验证码" />
            <el-button class="captcha-btn" type="primary" @click="sendSms()">{{ sendContent }}</el-button>
          </el-form-item>
          <div class="forget-password">
            <el-button type="text" @click="toForget()">忘记密码</el-button>
          </div>
          <div class="login-submit">
            <el-button @click="postLogin" type="primary">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { postLogin, getQueryUserRoleByUserId, getUserCurrent, getMenuRoleTree, postCaptchaSms } from '@/axios/users'
import { loginTime } from '@/utils/index'
export default {
  data () {
    return {
      loginForm: {
        appId: this.$store.state.appId,
        username: '',
        password: '',
        captcha: '',
        uuid: ''
      },
      codeImg: null,
      rules, // 重置密码验证
      // 验证码
      sendContent: '获取验证码',
      smsWait: 0
    }
  },
  created () {
    if (sessionStorage.getItem('timeout')) {
      this.$message.error('登录超时，请重新登陆。')
      sessionStorage.removeItem('timeout')
    }
    document.onkeydown = (e) => {
      const key = window.event.keyCode
      if (key === 13 && !localStorage.getItem('Authorization')) this.postLogin()
    }
  },
  methods: {
    // 发送验证码
    async sendSms () {
      if (this.smsWait !== 0) {
        return false
      }
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        this.$message.error('请输入账号和密码')
        return false
      }
      const params = {
        password: this.loginForm.password,
        username: this.loginForm.username,
        appId: this.$store.state.appId
      }
      const res = await postCaptchaSms(params)
      if (res.code === 200) {
        this.$alert(`验证码已发送到您手机号为${res.data.phone}上，请注意查收。`, '提示', {
          confirmButtonText: '确定',
          showClose: false
        }).then(() => {
          this.loginForm.uuid = res.data.uuid
          this.$refs.captcha.focus()
        }).catch(() => { })
        this.smsWait = 60
        this.waitSms()
        this.smsInterval = setInterval(() => {
          this.waitSms()
        }, 1000)
      }
    },
    waitSms () {
      this.smsWait--
      if (this.smsWait === 0) {
        clearInterval(this.smsInterval)
        this.sendContent = '重新获取验证码'
      } else {
        this.sendContent = this.smsWait + '秒后重新获取'
      }
    },
    // 登录
    async postLogin () {
      if (this.loginForm.username === '' && this.loginForm.password === '' && this.loginForm.captcha === '') {
        this.$message.error('请先输入账号密码')
        this.$refs.username.focus()
        return
      }
      if (this.loginForm.username === '') {
        this.$message.error('请输入账号')
        this.$refs.username.focus()
        return
      }
      if (this.loginForm.password === '') {
        this.$message.error('请输入密码')
        this.$refs.password.focus()
        return
      }
      if (this.loginForm.captcha === '') {
        this.$message.error('请输入验证码')
        this.$refs.captcha.focus()
        return
      }
      const res = await postLogin(this.loginForm)
      if (res.code === 200) {
        // 跳转到第一个路由页面
        localStorage.setItem('Authorization', res.data.accessToken)
        localStorage.setItem('refreshToken', res.data.refreshToken)
        localStorage.setItem('token', res.data.accessToken)
        sessionStorage.setItem('token', res.data.accessToken)
        loginTime()
        this.getPath() // 获取跳转链接
      } else {
        this.captcha()
      }
    },
    // 获取登录后跳转的链接
    async getPath () {
      // 获取用户信息
      const ares = await getUserCurrent()
      if (ares.code === 200) {
        // 本地存储用户信息
        localStorage.setItem('userInfo', JSON.stringify(ares.data))
        // 拿到userid 获取角色
        const bres = await getQueryUserRoleByUserId(ares.data.userId)
        if (bres.code === 200) {
          if (bres.data.length) { // 角色可能是多条 所以默认获取第一条角色信息
            const params = `${bres.data[0].roleId}?appId=${this.$store.state.appId}`
            const cres = await getMenuRoleTree(params)
            if (cres.code === 200) {
              if (cres.data.length) {
                const routeItem = cres.data[0]
                let parh = ''
                if (routeItem.children[0].path.indexOf('/') > -1) { // 区分是否首页路径
                  parh = routeItem.children[0].path
                } else {
                  parh = `${routeItem.path}/${routeItem.children[0].path}`
                }
                this.$router.push(parh)
              } else {
                this.$message.error('当前用户无角色权限，请联系超级管理员')
              }
            }
          } else {
            this.$message.error('当前用户无菜单权限，请联系超级管理员')
          }
        }
      }
    },
    // 忘记密码
    toForget () {
      // 用户绑定的手机号发送验证短信
      this.$router.push('/forget')
    }
  }
}
// 重置密码验证
const rules = {
  username: [
    { required: true, message: '请输入账号或绑定的手机号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入登录密码', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ]
}
</script>

<style lang="less" scoped>
.login-bg {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: url("../assets/login-bg.jpg") center center;
  position: relative;
  .login-box {
    width: 500px;
    min-width: 500px;
    height: auto;
    background: #ffffff;
    border-radius: 8px;
    padding: 40px 46px 50px;
    box-sizing: border-box;
    position: absolute;
    left: calc(50% + 400px);
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 2px 4px 0px rgba(0, 76, 161, 0.1);
    .content-item {
      width: 100%;
      height: 100%;
      position: relative;
      .logo {
        width: 100%;
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        color: #306be2;
        .logo-img {
          width: 420px;
        }
      }
      /deep/ .el-form {
        width: 100%;
        margin: 0 auto;
        padding-top: 27px;
        .el-form-item {
          height: 46px;
          margin-bottom: 20px;
          &:last-child {
            margin-bottom: 0;
          }
          .el-form-item__content {
            margin-left: 0 !important;
            height: 100% !important;
            position: relative;
            display: flex;
            .el-input {
              .el-input__inner {
                height: 46px;
                padding-left: 40px;
              }
              .el-input__prefix {
                left: 10px;
                top: 1px;
                color: #306be2;
              }
            }
            .code-img {
              width: 110px;
              height: 40px;
              position: absolute;
              right: 1px;
              cursor: pointer;
              border-radius: 4px;
            }
          }
        }
      }
      /deep/ .login-submit {
        width: 100%;
        margin: 0 auto;
        position: relative;
        .el-button {
          width: 100%;
          height: 40px;
          background: #306be2;
          // border-radius: 20px;
          font-size: 14px;
          font-weight: 400;
        }
        .el-button--medium {
          padding: 13px;
        }
        .link {
          position: absolute;
          right: 0;
          top: 52px;
          text-decoration: underline;
          color: #306be2;
        }
      }
      /deep/ .forget-password {
        width: 100%;
        margin: 0 auto;
        position: relative;
        margin-top: -13px;
        margin-bottom: 10px;
        text-align: right;
        .el-button {
          font-size: 13px;
          font-weight: 400;
          color: #306be2;
        }
      }
    }
  }
}
.captcha {
  width: 270px;
}
.ckediter {
  display: none;
}
.captcha-btn {
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translate(0, -50%);
  height: 46px !important;
}
</style>
