<template lang="pug">
  div(class="lt-grid-container")
    div(class="lt-header")
    div(class="lt-body md:lt-body-md  lg:lt-body-lg  xl:lt-body-xl")
      div(ref="menu" class="text-center md:text-left justify-center").lt-menu
          div(class="hover:text-gray-700 text-gray-600 text-2xl cursor-pointer text-center md:text-left ").mb-2
            nuxt-link(to="/" active-class="none")
              div example title
          div(class="w-full md:w-3/4")
            hr  
          div(class="text-center md:text-left").mt-2
            .flex.flex-col
              div(v-for="link in links" class="text-gray-600 text-xl pr-4")
                nuxt-link(:to="link.to" link-active-class="link-active") {{link.label}}
          //- div(ref="table-container" class="hidden md:block").sticky.top-0.markdown-body.mt-24.pt-8
          //-   div.table-of-contents-title Table of Contents
      .lt-content
          div(class="text-gray-800 mx-5 md:mx-0")
            nuxt
    .lt-footer
      footer(class="w-full").text-center William Hoyle


    //- div
    //-   .flex.mb-4.h-auto
    //-     div(class="ml-auto bg-gray-500 h-12")
    //-     div(class="w-full sm:w-1/6 h-12")
    //-     div(class="w-full sm:w-1/2 h-12")
    //-     div(class="w-full sm:w-1/6 h-12")
    //-     div(class="mr-auto bg-gray-500 h-12")
</template>

<script>
export default {
  data() {
    return {
      links: [
        { to: '/blog', label: 'blog' },
        { to: '/projects', label: 'projects' },
        { to: '/code', label: 'code snippets' },
        { to: '/links', label: 'links' },
        { to: '/fitness', label: 'fitness' }
      ]
    }
  },
  mounted() {
    // let toc = document.getElementsByClassName('table-of-contents')
    // document.get
    // if (toc.length) {
    //   let clonedToc = toc[0].cloneNode(true)
    //   this.$refs['table-container'].appendChild(clonedToc)
    // }
  }
}
</script>

<style lang="css">
.nuxt-link-active {
  font-weight: 900;
  color: rgb(94, 145, 89);
}
</style>