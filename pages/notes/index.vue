<template lang="pug">
page-layout(
  :attributes='{ title: "notes", subtitle: "my personal notes", updatedAt: mostRecentNoteDate }'
)
  template(#body)
    .mt-10(:key='note.attributes.href', v-for='note in notes')
      component.no-border(:is='note.vue.component')
</template>

<script>
const notes = require('../../util/helpers.js').getPosts(
  require.context('~/content/notes/', true, /\.md$/)
)

export default {
  data() {
    return {
      notes: Object.keys(notes)
        .map((k) => notes[k])
        .sort((a, b) => {
          if (a.attributes.jsUpdatedAt == null) {
            return 1
          }
          if (b.attributes.jsUpdatedAt == null) {
            return -1
          }
          return b.attributes.jsUpdatedAt > a.attributes.jsUpdatedAt
        }),
    }
  },
  computed: {
    mostRecentNoteDate() {
      return this.notes[0].attributes.updatedAt
    },
  },
}
</script>

<style>
.no-border.markdown-body h1,
.no-border.markdown-body h2 {
  border-bottom: none !important;
  padding-bottom: 0 !important;
}
</style>