<template lang="pug">
page-layout(:attributes='{ title: "notes", subtitle: "my personal notes" }')
  template(#body)
    div(:key='note.attributes.href', v-for='note in notes')
      .text-2xl {{ note.attributes.title }}
      span.mt-3.bg-blue-700.rounded.text-xs.text-gray-100.p-1.mr-2(
        :key='tag',
        v-for='tag in note.attributes.tags || []'
      ) {{ tag }}

      component(:is='note.vue.component')
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
          if (a.attributes.updatedAt == null) {
            return 1
          }
          if (b.attributes.updatedAt == null) {
            return -1
          }
          return b.attributes.updatedAt > a.attributes.updatedAt
        }),
    }
  },
  computed: {},
}
</script>