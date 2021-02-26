<template lang="pug">
page-layout.blog(
  :attributes='{ title: "notes", subtitle: "collection of ideas and notes", updatedAt: mostRecentNoteDate }'
)
  template(#body)
    .mt-10(:key='note.attributes.href', v-for='note in notes')
      component(:is='getComponent(note.key)')
    //-   span.mt-3.bg-blue-700.rounded.text-xs.text-gray-100.p-1.mr-2(
    //-     :key='tag',
    //-     v-for='tag in note.attributes.tags || []'
    //-   ) {{ tag }}
</template>

<script>
const notes = require('../../util/helpers.js').getPosts(
  require.context('~/content/notes/', true, /\.md$/)
)
export default {
  created() {
    this.notes = this.$store.state.notes.filter(
      (p) => Object.keys(p.attributes).length
    )

    this.notes.sort((a, b) => {
      return (
        new Date(a.attributes.jsCreatedAt).getTime() -
        new Date(b.attributes.jscreatedAt).getTime()
      )
    })
  },
  data() {
    return {
      notes: [],
    }
  },
  methods: {
    getComponent(note) {
      return notes[note].vue.component
    },
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