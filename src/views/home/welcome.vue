<template>
  <div>
    <div class="follow-up">
      <div>
        <img src="@/assets/home/follow-up-image.png" /><br />
        欢迎登录{{$store.state.objectName}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.follow-up{width:calc(100% - 40px);height:calc(100% - 20px);margin:0 20px 20px 20px;display:flex; justify-content: center;align-items:center;background:#fff;box-shadow:0px 1px 10px 3px rgba(0, 0, 0, 0.06);border-radius: 6px;
  div{text-align:center;font-size:32px;color:#3E3E3E;font-weight:bold;
    img{width:576px;margin-bottom:50px;}
  }
}
</style>
