<template>
  <el-upload :headers="headers" action="/api/permission/file/upload" :disabled="disabled" :show-file-list="false" accept="image/jpeg,image/png" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
    <img v-if="value" :src="value" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    <i class="el-icon-error" @click.stop="delImg()" v-if="value && !disabled"></i>
  </el-upload>
</template>

<script>
export default {
  data () {
    return {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('Authorization')
      }
    }
  },
  props: {
    value: {
      default: ''
    },
    disabled: {
      default: false
    }
  },
  model: {
    prop: 'value',
    event: 'getValue'
  },
  methods: {
    getValue (item) {
      this.$emit('getValue', item)
    },
    beforeAvatarUpload (file) {
      this.$store.state.loading = true
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        this.$store.state.loading = false
      }
      return isLt2M
    },
    handleAvatarSuccess (res, file) {
      if (res.code !== 200) {
        this.$message.error(res.msg)
        return false
      }
      this.getValue(res.data)
      this.$store.state.loading = false
      this.$message.success('上传成功')
    },
    delImg () {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.getValue('')
      }).catch(() => { })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-upload {
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/ .el-upload:hover {
  border-color: #409eff;
}
/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
/deep/ .avatar {
  width: 60px;
  height: 60px;
  display: block;
}
.el-icon-error {
  position: absolute;
  right: 3px;
  top: 3px;
  z-index: 9;
  font-size: 16px;
  cursor: pointer;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 2px #333;
}
</style>
