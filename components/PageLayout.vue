<template lang="pug">
div
  .flex
    .flex-grow.text-4xl.text-gray-800.leading-none {{ title }}
    .flex-grow.text-right.text-lg.text-gray-600.leading-none {{ updatedAt }}
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