<template>
  <div class="page-header">
    <div class="left">
      <div class="logo">
        <!-- <img src="../assets/logo.png" alt="logo"> -->
        {{$store.state.objectName}}
      </div>
    </div>
    <div class="right">
      <!-- <div class="button m-r-20" @click="logout()"><i class="iconfont icon-tuichu"></i>退出登录</div> -->
      <div class="head-name">
        <div class="head-img">
          <img class="avatar" src="../assets/head-img.png">
        </div>
        <div class="head-text">
          <el-dropdown @command="handleCommand">
            <span class="userName">
              {{$store.state.userInfo.userName}}<i class="el-icon-arrow-down m-l-10" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="editPassWord">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!-- 首次登录必须进行修改密码 -->
    <Password v-if="$store.state.userInfo && $store.state.userInfo.userId" />
  </div>
</template>

<script>
import Password from '@/components/password.vue'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      userInfo: {},
    }
  },
  created () {

  },
  methods: {
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
  // background: #fff;
  background: #0a9f96;
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
