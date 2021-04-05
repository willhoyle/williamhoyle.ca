import Vue from 'vue'

import PageLayout from '~/components/PageLayout.vue'
Vue.component('PageLayout', PageLayout)

import PlantCard from '~/components/PlantCard.vue'
Vue.component("PlantCard", PlantCard)

// import TableOfContents from '~/components/TableOfContents.vue'
// Vue.component("TableOfContents", TableOfContents)


// import MarkdownIt from 'markdown-it'

// let md = MarkdownIt({})
// Vue.prototype.$md = {
//     render: (content) => {
//         return md.render(content)
//     }
// }