<template lang="pug">
    section.pad-top
      div.container
        .columns.is-centered.is-multiline
          .column.is-1
          .column.is-10.has-text-centered
            h1.is-size-1 William Hoyle
            h4.is-size-5
              template(v-for="page in mainPages")
                nuxt-link(:to="page.to" :class="{'has-text-weight-bold': isActive(page.to)}").px-4
                  span.has-text-primary {{page.name}}
              
          .column.is-1.has-text-right.mt-3
            a(href="https://github.com/willhoyle")
              img(src="~/static/GitHub-Mark/PNG/GitHub-Mark-32px.png")
</template>

<script>
export default {
  data() {
    return {
      mainPages: [
        {
          to: '/',
          name: 'home'
        },
        {
          to: '/blog',
          name: 'blog'
        },
        {
          to: '/projects',
          name: 'projects'
        },
        {
          to: '/documentation',
          name: 'documentation'
        }
      ]
    }
  },
  computed: {
    isActive() {
      return route => {
        return route == '/' + this.$route.fullPath.split('/')[0]
      }
    }
  }
}
</script>
