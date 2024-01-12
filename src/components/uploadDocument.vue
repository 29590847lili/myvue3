<template>
  <el-upload :headers="headers" :accept="accept" action="/tumor/file/uploadfile" :on-success="handleAvatarSuccess" :on-preview="handlePreview" :limit="limit" :on-remove="handleRemove" :before-remove="beforeRemove" :on-exceed="handleExceed" :before-upload="beforeAvatarUpload" :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
</template>

<script>
export default {
  data () {
    return {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('Authorization')
      },
      fileList: []
    }
  },
  props: {
    value: {
      default: ''
    },
    disabled: {
      default: false
    },
    accept: {
      default: '.pdf,.xls,.xlsx,.doc,.docx,,.PDF'
    },
    limit: {
      default: 1
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
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {

    },
    beforeRemove (file, fileList) {
      if (file && file.status === 'success') {
        return this.$confirm(`确定移除 ${file.name}？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.getValue('')
        }).catch(() => { })
      }
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeAvatarUpload (file) {
      this.$store.state.loading = true
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        this.getValue('')
        this.$message.error('上传文件大小不能超过 10M!')
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
