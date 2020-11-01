<template lang="pug">
  div(class="lt-grid-container")
    div(class="lt-header")
    div(class="lt-body md:lt-body-md  lg:lt-body-lg  xl:lt-body-xl")
      div(ref="menu" class="text-center md:text-left justify-center").lt-menu
          div(class="hover:text-gray-800 text-gray-600 text-2xl cursor-pointer text-center md:text-left ").mb-2
            nuxt-link(to="/" link-active-class="link-active")
              div william's notes
          //- div(class="w-full md:w-3/4")
            //- hr  
          div(class="text-center md:text-left").my-5.flex.flex-wrap
              div(v-for="link in links" class="w-1/2 md:w-full hover:text-gray-800 text-gray-600 text-xl pr-4")
                nuxt-link(:to="link.to" link-active-class="link-active") {{link.label}}
          div(class="w-full py-2 md:hidden")
            //- hr  
          //- div(ref="table-container" class="hidden md:block").sticky.top-0.markdown-body.mt-24.pt-8
          //-   div.table-of-contents-title Table of Contents
      .lt-content
          div(class="text-gray-800 mx-5 md:mx-0")
            nuxt
    .lt-footer
        div(class="w-full py-12 md:hidden")
            hr  

        footer(class="w-full pb-12").text-gray-600.flex.flex-wrap.justify-center
            .flex.flex-wrap.w-full
                div(class="w-1/2 py-5").text-right.pr-5
                    | Built by
                div(class="w-1/2 py-5")
                    div.w-full
                        | William Hoyle
                        div.mt-1
                            img(src="/location-pin.svg").inline.fill
                            | Toronto, Canada 
                    div.w-full.mt-1
                        a(href="https://github.com/willhoyle").nuxt-link-active 
                            img(src="/GitHub-Mark/PNG/GitHub-Mark-32px.png" class="w-6 h-6 mr-2").inline
                            | Github 
                        
            .flex.flex-wrap.w-full.mt-3
                div(class="w-1/2").text-right.pr-5
                    | Built with
                div(class="w-1/2")
                    div.w-full
                        a(href="https://nuxtjs.org").nuxt-link-active nuxt
                    div.w-full
                        a(href="https://tailwindcss.com").nuxt-link-active tailwindcss
                    div.w-full
                        a(href="https://github.com/hmsk/frontmatter-markdown-loader").nuxt-link-active frontmatter-markdown-loader


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
        { to: '/snippets', label: 'code snippets' },
        { to: '/links', label: 'links' },
        { to: '/fitness', label: 'fitness' },
        { to: '/garden', label: 'garden' }
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
  color: rgb(98, 106, 224);
}
</style>
