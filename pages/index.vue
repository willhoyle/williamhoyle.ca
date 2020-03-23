<template lang="pug">
      .flex.flex-wrap
        div(class="w-full lg:w-1/2 px-5 mb-5 md:mb-0")
          front-page-card(title="Blog")
            div
              ul
                li(v-for="post in posts").list-decimal
                  nuxt-link(:to="post.attributes.href") 
                    span.front-page-links {{post.attributes.title}}
        div(class="w-full lg:w-1/2 px-5")
          front-page-card(title="Links")
            div
              ul
                li(v-if="Object.keys(post.attributes).length" v-for="post in posts").list-decimal
                  nuxt-link(:to="post.attributes.href") 
                    span.front-page-links {{post.attributes.title}}
</template>

<script>
const posts = require('../util/helpers.js').getPosts(
  require.context('~/content/', true, /\.md$/)
)

export default {
  name: 'HomePage',
  data() {
    return {}
  },
  computed: {
    posts() {
      return this.$store.state.posts
        .filter(p => Object.keys(p.attributes).length)
        .sort((a, b) => {
          return (
            new Date(b.attributes.publishedAt).getTime() -
            new Date(a.attributes.publishedAt).getTime()
          )
        })
    }
  },
  filters: {},
  async asyncData({ isDev }) {}
}
</script>