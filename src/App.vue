<template>
  <div id="app">
    <Loading />
    <keep-alive>
      <RouterView id="router-view" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <RouterView id="router-view" v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script >
import Loading from "@/components/loading.vue";
export default {
  data () {
    return {};
  },
  components: {
    Loading,
  },
};
</script>

<style scoped>
#router-view {
  width: 100%;
  height: 100%;
}
</style>