<template>
  <div class="upload-block">
    <el-upload class="video-uploader" :headers="headers" element-loading-spinner="el-icon-loading" :action="action" :accept="accept" :show-file-list="false" :http-request="handleUpload" :before-upload="beforeAvatarUpload">
      <video v-if="videoUrl" :src="videoUrl" ref="video" class="video" @canplaythrough="handlerVideoCanplaythrough"></video>
      <el-progress v-if="videoFlag" type="circle" :percentage="videoUploadPercent" class="process-style"></el-progress>
      <i v-else-if="!videoFlag" class="el-icon-plus video-uploader-icon"></i>
    </el-upload>
    <div class="text">{{tip}}</div>
    <div class="disabled" v-if="disabled"></div>
  </div>
</template>

<script>
import axios from 'axios'
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
      default: 'video/mp4,video/mov'
    },
    size: {
      default: '10'
    },
    sizeUnit: {
      default: 'MB'
    },
    disabled: {
      default: false
    },
    tip: {
      default: '支持上传mov/mp4格式文件，文件不能超过2G'
    }
  },
  data () {
    return {
      videoFlag: false,
      videoUploadPercent: 0,
      videoUrl: '',
      videoSize: '',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('Authorization')
      }
    }
  },
  watch: {
    value: {
      handler (value) {
        this.videoUrl = value
      },
      immediate: true
    }
  },
  model: {
    prop: 'value',
    event: 'handleAvatarSuccess'
  },
  methods: {
    async handleUpload (res) {
      this.videoUrl = ''
      const form = new FormData()
      form.append('file', res.file)
      axios({
        url: this.action,
        method: 'post',
        data: form,
        headers: { Authorization: 'Bearer ' + localStorage.getItem('Authorization') },
        onUploadProgress: progressEvent => {
          this.videoFlag = true
          this.videoUploadPercent = parseInt(progressEvent.loaded / progressEvent.total * 100)
        }
      }).then(res => {
        if (this.videoUploadPercent === 100) {
          this.videoUploadPercent = 0
          this.videoFlag = false
        }
        if (res.code === 200) {
          this.videoFlag = false
          this.$message.success('上传成功')
          this.videoUrl = res.data
          this.$emit('handleAvatarSuccess', this.videoUrl)
        }
      }).then()
    },
    // 视频加载完成后触发
    handlerVideoCanplaythrough () {
      this.$emit('change', { duration: this.$refs.video.duration, videoUrl: this.videoUrl, size: this.videoSize })
    },
    beforeAvatarUpload (file) {
      const size = parseInt(this.size)
      this.videoSize = file.size
      const fSize = this.sizeUnit.toUpperCase() === 'GB' ? file.size / 1024 / 1024 / 1024 : file.size / 1024 / 1024
      const isLtSize = fSize < size
      if (!isLtSize) {
        this.$message.error(`上传文件大小不能超过 ${size}${this.sizeUnit}!`)
      }
      return isLtSize
    }
  }
}
</script>

<style lang="less" scoped>
.video-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 304px;
  height: 154px;
  &:hover {
    border-color: #306BE2 !important;
  }
}
.video-uploader-icon {
  font-size: 16px;
  color: #8c939d;
  width: 304px;
  height: 154px;
  line-height: 134px;
  text-align: center;
  position: relative;
  background: #f5f7fa;
  &::after {
    display: block;
    content: '上传视频';
    font-size: 12px;
    position: absolute;
    color: #606266;
    left: 128px;
    bottom: -6px;
  }
}
.video {
  width: 304px;
  height: 154px;
  display: block;
}
.upload-block {
  position: relative;
  .text {
    font-size: 12px;
    color: #999;
  }
  .disabled {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    cursor: not-allowed;
  }
  .process-style {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
