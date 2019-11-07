<template lang="pug">
                
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {}
  },
  filters: {},
  async asyncData({ isDev }) {
    if (process.server) {
      return {
        // posts: await ssrHelpers.getRecentPosts()
      }
    } else {
      return {
        posts: []
      }
    }
  }
}
</script>

<style>
.pad-top {
  padding-top: 25px;
}
</style>