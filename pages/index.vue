<template lang="pug">
.flex.flex-wrap
  .w-full.px-5.mb-2
    .text-xl.text-gray-600.text-center(class='md:text-left') Hi, I'm William 👋
  .w-full.px-5.mb-5(class='lg:w-1/2 md:mb-0')
    .text-3xl.text-gray-800 Blog
    ul
      li.list-disc.mt-4.leading-5(v-for='post in posts')
        nuxt-link(:to='post.attributes.href')
          span.front-page-links {{ post.attributes.title }}
  .w-full.px-5.mb-5(class='lg:w-1/2 md:mb-0')
    .text-3xl.text-gray-800 What I'm working on right now
    .w-full.rounded.border.shadow.p-5
      .preview(class='xs:hidden lg:block')
        a(href='https://financialcpp.com')
          img(src='/fpp.png')
      .text-xl.text-gray-800 
        a.front-page-links(href='https://financialcpp.com') financialcpp
      .text-gray-800 high performance c++ stock market backtester with nodejs bindings
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {}
  },
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
  filters: {},
  async asyncData({ isDev }) {},
}
</script>
