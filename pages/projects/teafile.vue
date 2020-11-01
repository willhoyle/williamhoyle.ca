<template lang="pug">
    div
        .text-4xl.text-gray-800 {{title}}
        .text-lg.text-gray-600 {{createdAt}}
        div.pt-5
            teafile-js
</template>
<script>
import teafile from '../../content/projects/teafile.md'

export default {
  components: {
    TeafileJs: teafile.vue.component
  },
  layout(context) {
    return 'default'
  },
  data() {
    console.log(teafile)
    return {
      ...teafile.attributes
    }
  }
}
</script>
