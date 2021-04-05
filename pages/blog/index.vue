<template lang="pug">
div
  .w-full.px-5.mb-5(class='lg:w-1/2 md:mb-0')
    .text-4xl.text-gray-800.leading-none Blog
    .text-lg.text-gray-600 Posts where I explore different ideas and thoughts
    ul
      li.mt-6(v-for='post in posts')
        nuxt-link.leading-none(:to='post.attributes.href')
          span.front-page-links {{ post.attributes.title }}
        .text-gray-600.text-sm.leading-none {{ post.attributes.createdAt }}
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.state.posts
        .filter((p) => Object.keys(p.attributes).length)
        .sort((a, b) => {
          return (
            new Date(b.attributes.jsCreatedAt).getTime() -
            new Date(a.attributes.jsCreatedAt).getTime()
          )
        })
    },
  },
}
</script>