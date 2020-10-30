<template lang="pug">
    div.content
       
                
</template>

<script>
export default {
  computed: {
    snippets() {
      return this.$store.state.snippets
    }
  }
}
</script>