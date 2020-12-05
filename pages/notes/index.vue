<template lang="pug">
page-layout(
  :attributes='{ title: "notes", subtitle: "my personal notes", updatedAt: mostRecentNoteDate }'
)
  template(#body)
    .mt-10(:key='note.attributes.href', v-for='note in notes')
      component(:is='note.vue.component')
    //-   span.mt-3.bg-blue-700.rounded.text-xs.text-gray-100.p-1.mr-2(
    //-     :key='tag',
    //-     v-for='tag in note.attributes.tags || []'
    //-   ) {{ tag }}
</template>

<script>
const notes = require('../../util/helpers.js').getPosts(
  require.context('~/content/notes', true, /\.md$/)
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