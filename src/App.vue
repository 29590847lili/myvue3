<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <!-- <RouterView /> -->
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
// import { RouterLink, RouterView } from "vue-router"
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
