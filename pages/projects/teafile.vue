<template lang="pug">
page-layout(:attributes='attributes')
  template(#body)
    teafile-js
</template>
<script>
import teafile from '../../content/projects/teafile.md'

export default {
  components: {
    TeafileJs: teafile.vue.component,
  },

  data() {
    return {
      attributes: teafile.attributes,
    }
  },
}
</script>
