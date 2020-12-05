<template lang="pug">
.lt-grid-container
  .lt-header
  .lt-body(class='md:lt-body-md lg:lt-body-lg xl:lt-body-xl')
    .text-center.justify-center.lt-menu(ref='menu', class='md:text-left')
      .text-gray-600.text-2xl.cursor-pointer.text-center.mb-2(
        class='hover:text-gray-800 md:text-left'
      )
        nuxt-link(to='/', link-active-class='link-active')
          div william's notes
      //- div(class="w-full md:w-3/4")
        //- hr  
      .text-center.my-5.flex.flex-wrap(class='md:text-left')
        .text-gray-600.text-xl.pr-4(
          v-for='link in links',
          class='w-1/2 md:w-full hover:text-gray-800'
        )
          nuxt-link(:to='link.to', link-active-class='link-active') {{ link.label }}
      .w-full.py-2(class='md:hidden')
        //- hr  
      //- div(ref="table-container" class="hidden md:block").sticky.top-0.markdown-body.mt-24.pt-8
      //-   div.table-of-contents-title Table of Contents
    .lt-content
      .text-gray-800.mx-5(class='md:mx-0')
        nuxt
  .lt-footer
    footer.w-full.pb-12.text-gray-600.flex.flex-wrap.justify-center
      .w-full.pt-12 
        hr
      .flex.flex-wrap.w-full
        .py-5.text-right.pr-5(class='w-1/4 md:w-1/2')
          | Built by
        .py-5(class='w-3/4 md:w-1/2')
          .w-full
            | William Hoyle
            .mt-1
              img.inline.fill(src='/location-pin.svg')
              | Toronto, Canada
          .w-full.mt-1
            a.nuxt-link-active(href='https://github.com/willhoyle') 
              img.w-6.h-6.mr-2.inline(src='/GitHub-Mark/PNG/GitHub-Mark-32px.png')
              | Github
      .w-full 
        hr
      .flex.flex-wrap.w-full.mt-3
        .py-5.text-right.pr-5(class='w-1/4 md:w-1/2')
          | Built with
        .py-5(class='w-3/4 md:w-1/2')
          .w-full
            a.nuxt-link-active(href='https://nuxtjs.org') nuxt
          .w-full
            a.nuxt-link-active(href='https://tailwindcss.com') tailwindcss
          .w-full
            a.nuxt-link-active(href='https://github.com/hmsk/frontmatter-markdown-loader') frontmatter-markdown-loader

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
        { to: '/notes', label: 'notes' },
        { to: '/projects', label: 'projects' },
        { to: '/links', label: 'links' },
        { to: '/fitness', label: 'fitness' },
        { to: '/garden', label: 'garden' },
      ],
    }
  },
  mounted() {
    // let toc = document.getElementsByClassName('table-of-contents')
    // document.get
    // if (toc.length) {
    //   let clonedToc = toc[0].cloneNode(true)
    //   this.$refs['table-container'].appendChild(clonedToc)
    // }
  },
}
</script>

<style lang="css">
.nuxt-link-active {
  font-weight: 900;
  color: rgb(98, 106, 224);
}
</style>
