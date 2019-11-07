<template lang="pug">
  div
    website-navbar
    section.main-content.mt-5
      .container
        .columns.is-centered
          .column.is-8
            nuxt
    footer.footer
      .content.has-text-centered
            | blog layout
        
</template>

<script>
import WebsiteNavbar from '~/components/WebsiteNavbar.vue'
export default {
  components: { WebsiteNavbar }
}
</script>
