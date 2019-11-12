<template>
  <div id="app" class="st-layout">
    <nav-bar />
    <nuxt />
  </div>
</template>
<script>
import NavBar from '~/components/NavBar.vue'
export default {
  components: {
    NavBar
  }
}
</script>
<style scoped lang="scss">
.st-layout {
  text-align: center;
}
</style>
