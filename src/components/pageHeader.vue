<template>
  <div class="page-header">
    <div class="left">
      <div class="logo">
        <img src="../assets/logo.png" alt="logo">
      </div>
    </div>
    <div class="right">
      <!-- 协议 -->
      <Agreement />
      <div v-if="$store.state.baselineQuestionnaire" class="survey" @click="$router.push('/otherWorkPlatforms/baselineQuestionnaireInput')">
        <img class="message" src="../assets/message.png">
        <div>填写基线问卷</div>
      </div>
      <authentication></authentication>
      <div class="button m-r-20" @click="$router.push('/staging/helpCenter')"><i class="iconfont icon-wenhao"></i>帮助中心</div>
      <div class="line"></div>
      <el-dropdown @command="handleCommand">
        <div class="button m-r-20" @click="$router.push('/staging/personCenter')"><i class="iconfont icon-gerenzhongxin"></i>个人中心<i class="el-icon-caret-bottom"></i></div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <div class="button m-r-20" @click="logout()"><i class="iconfont icon-tuichu"></i>退出登录</div> -->
      <!-- <div class="head-name">
        <div class="head-img">
          <img class="avatar" src="../assets/head-img.png">
        </div>
        <div class="head-text">
          <el-dropdown @command="handleCommand">
            <span class="userName">
              {{$store.state.userInfo.userName}}<i class="el-icon-arrow-down m-l-10" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="editPassWord">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div> -->
    </div>
    <!-- 首次登录必须进行修改密码 -->
    <Password v-if="$store.state.userInfo && $store.state.userInfo.userId" />
  </div>
</template>

<script>
import Password from '@/components/password'
import { postQuestionBaseInfoByPage } from '@/axios/baselineQuestionnaireManage'
import { mapMutations } from 'vuex'
// 搜索条件
const condition = {
  status: '3' // 表单状态 3是未填写
}
export default {
  data () {
    return {
      userInfo: {},
      search: {
        condition: { ...condition },
        page: {
          current: 1,
          size: 10
        }
      }
    }
  },
  created () {
    // 获取是否有问卷填写
    this.getTableList()
  },
  methods: {
    // 获取是否有问卷填写
    async getTableList (page) {
      if (page) this.search.page.current = 1
      this.tableData = []
      const res = await postQuestionBaseInfoByPage(this.search)
      if (res.code === 200) {
        if (res.data.records && res.data.records.length > 0) {
          this.$store.state.baselineQuestionnaire = true
        } else {
          this.$store.state.baselineQuestionnaire = false
        }
      }
    },
    ...mapMutations(['commitPasswordStatus']),
    // 右上角操作
    handleCommand (command) {
      switch (command) {
        case 'editPassWord':
          this.commitPasswordStatus(true)
          break
        case 'logout':
          this.logout()
          break
      }
    },
    // 退出
    logout () {
      this.$confirm('确定退出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$router.push('/')
      }).catch(() => { })
    }
  },
  components: {
    Password
  }
}
</script>

<style lang="less" scoped>
.page-header {
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  background: #fff;
  box-shadow: 3px 0 8px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
  .left {
    display: flex;
    padding-left: 20px;
    align-items: center;
    font-size: 20px;
    color: #fff;
    .logo {
      display: inline-block;
      width: 364px;
      height: 26px;
      img {
        height: 26px;
      }
    }
  }
  .right {
    padding-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .line {
      height: 14px;
      width: 1px;
      margin-right: 20px;
      background: #e7e9f1;
    }
    .button {
      cursor: pointer;
      color: #666;
      font-size: 14px;
      display: flex;
      align-items: center;
      i {
        margin-right: 4px;
      }
      i.icon-gerenzhongxin {
        font-size: 28px;
        color: #909eb3;
      }
    }
    .head-name {
      height: 56px;
      display: flex;
      align-items: center;
      .head-img {
        margin-right: 10px;
        .avatar {
          width: 26px;
          height: 26px;
        }
      }
      .head-text {
        cursor: pointer;
        color: #333;
        .el-dropdown {
          color: #333;
        }
        .userName {
          color: #fff;
        }
        .iconfont {
          font-size: 13px;
          margin-left: 5px;
        }
      }
    }
  }
}
.survey {
  width: 139px;
  height: 40px;
  line-height: 40px;
  background: #fef7e5;
  border-radius: 20px;
  border: 1px solid #ffedca;
  font-weight: 600;
  color: #f39f19;
  font-size: 14px;
  text-align: center;
  margin-right: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.message {
  width: 14px;
  height: 16px;
  margin-right: 8px;
}
.el-icon-caret-bottom {
  color: #c0c4cc;
}
</style>
