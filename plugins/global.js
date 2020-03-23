import Vue from 'vue'
import Card from '~/components/Card.vue'



Vue.component("FrontPageCard", Card)

import TableOfContents from '~/components/TableOfContents.vue'
Vue.component("TableOfContents", TableOfContents)


import MarkdownIt from 'markdown-it'

let md = MarkdownIt({})
Vue.prototype.$md = {
    render: (content) => {
        return md.render(content)
    }
}