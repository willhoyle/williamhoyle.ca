<template lang="pug">
.card.shadow-lg.rounded-md.cursor-pointer(
  @click='popup',
  :class='modal && "fullscreen"'
)
  div(:class='modal && "overflow-y-auto"')
    img.object-cover.rounded-t-md(
      :src='src',
      :alt='alt',
      :class='modal ? "h-3/4" : "h-48 w-full"'
    )
  .p-3
    .text-2xl.font-semibold.leading-none {{ name }}
    .text-lg.text-gray-600.leading-4.mb-2 Flowers: {{ flowers ? flowers : "Not documented" }}
    .text-lg {{ comment }}
  .p-3(v-if='modal && $slots.default')
    slot
</template>

<script>
export default {
  props: {
    name: '',
    flowers: '',
    comment: '',
    src: '',
    alt: '',
  },
  data() {
    return {
      modal: false,
    }
  },
  methods: {
    popup() {
      this.modal = false
    },
  },
}
</script>

<style>
.fullscreen {
  position: fixed;
  top: 2.5%;
  left: 2.5%;
  height: 95%;
  width: 95%;
  background-color: white;
}
</style>