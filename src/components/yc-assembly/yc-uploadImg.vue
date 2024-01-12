<template>
  <div class="upload-block">
    <el-upload
      class="avatar-uploader"
      :headers="headers"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      :action="action"
      :accept="accept"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="text">{{tip}}</div>
    <div class="disabled" v-if="disabled"></div>
  </div>
</template>

<script>
export default {
  name: 'YcUploadImg',
  props: {
    value: {
      default: ''
    },
    action: {
      default: ''
    },
    accept: {
      default: 'image/jpeg,image/png'
    },
    size: {
      default: '10'
    },
    disabled: {
      default: false
    },
    tip: {
      default: '支持JPG/PNG格式'
    }
  },
  data () {
    return {
      imageUrl: '',
      loading: false,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('Authorization')
      }
    }
  },
  watch: {
    value: {
      handler (value) {
        this.imageUrl = value
      },
      immediate: true
    }
  },
  model: {
    prop: 'value',
    event: 'handleAvatarSuccess'
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.$emit('handleAvatarSuccess', res.data)
      this.loading = false
    },
    beforeAvatarUpload (file) {
      this.loading = true
      const size = parseInt(this.size)
      const isLtSize = file.size / 1024 / 1024 < size
      if (!isLtSize) {
        this.$message.error(`上传文件大小不能超过 ${size}MB!`)
        this.loading = false
      }
      return isLtSize
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader{border: 1px dashed #d9d9d9;border-radius: 6px;cursor: pointer;position: relative;overflow:hidden;width:104px;height:104px;
  &:hover{border-color: #306BE2!important;}
}
.avatar-uploader-icon{font-size: 16px;color: #8c939d;width: 104px;height: 104px;line-height: 80px;text-align: center;position:relative;background:#F5F7FA;
  &::after{display:block;content:'上传图片';font-size:12px;position:absolute;color:#606266;left:28px;bottom:-6px;}
}
.avatar{width: 104px;height: 104px;display: block;}
.upload-block{position:relative;
  .text{font-size:12px;color:#999;}
  .disabled{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;cursor:not-allowed;}
}
</style>
