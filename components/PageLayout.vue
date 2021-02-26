<template lang="pug">
div
  .flex(style='line-height: 1')
    .flex-grow.text-4xl.text-gray-800 {{ title }}
    .flex-grow.text-right.text-2lg.text-gray-600 {{ updatedAt }}
  .text-lg.text-gray-600 {{ subtitle }}
  slot(name='body')
</template>

<script>
export default {
  props: {
    attributes: {
      type: Object,
      default: Object,
    },
  },
  computed: {
    title() {
      return this.attributes.title
    },
    createdAt() {
      return this.attributes.createdAt
    },
    updatedAt() {
      return this.attributes.updatedAt
    },
    subtitle() {
      return this.attributes.subtitle
    },
  },
}
</script>