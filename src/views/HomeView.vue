<template>
  <main>
    aaa
    <YcSearchInput v-model="name" title="姓名" />
    bbb
  </main>
</template>
<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  mounted () {
    this.name = 'jack'
  }
}
</script>
