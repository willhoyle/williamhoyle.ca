<template lang="pug">
  div
    div.text-4xl.text-gray-800 Garden

    div.markdown-body.
        Notes on how to take care of my garden.
        
    img(src="@/assets/garden/phlox.jpg")
    span.text-gray-600 Garden phlox in full bloom
    //- template(v-for="link in links")
</template>

<script>
export default {
  asyncData({ payload }) {
    // if (payload) {
    //   links:
    // }
    // return {
    //   links: payload.links
    // }
  }
}
</script>
