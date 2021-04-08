const pkg = require('./package')

import path from 'path'
import glob from 'glob'

import Mode from 'frontmatter-markdown-loader/mode'

import hljs from 'highlight.js'

import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
    html: true,

    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return (
                    '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>'
                )
            } catch (__) { }
        }

        return '<pre class="hljs"><code>' + str + '</code></pre>'
    }
})

md.use(require('markdown-it-anchor'))
md.use(require('markdown-it-table-of-contents'), {
    includeLevel: [1, 2, 3, 4]
})

let isProd = process.env.NODE_ENV == 'production'

// constants
const baseURL = isProd ? '' : 'http://localhost:3000'

const getDynamicPaths = urlFilepathTable => {
    return [].concat(
        ...Object.keys(urlFilepathTable).map(url => {
            var filepathGlob = urlFilepathTable[url]
            return glob.sync(filepathGlob).map(filepath => {
                return `${path
                    .dirname(filepath)
                    .replace('content/', '')}/${path.basename(filepath, '.md')}`
            })
        })
    )
}

let content = {
    blog: 'content/blog/**/*.md',
}
if (!isProd) {
    content['drafts'] = 'content/blog/drafts/*.md'
}

const dynamicRoutes = getDynamicPaths(content)

module.exports = {
    target: 'static',

    /*
    ** Headers of the page
    */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap'
            }
        ]
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: 'red' },

    /*
    ** Global CSS
    */
    css: [],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: ['~/plugins/global.js'],

    /*
    ** Nuxt.js modules
    */
    buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/axios'],

    axios: {
        baseURL
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, { loaders }) {
            config.module.rules.push({
                test: /\.md$/,
                loader: 'frontmatter-markdown-loader',
                options: {
                    mode: [Mode.VUE_COMPONENT],
                    vue: {
                        root: 'markdown-body'
                    },
                    markdownIt: md
                }
            })
            config.module.rules.push({
                test: /\.md$/,
                loader: path.resolve('./my-loader.js')
            })

        }
    },
    serverMiddleware: [
        // API middleware
        '~/api/index.js'
    ],
    // router: {
    //   base: process.env.DEPLOY_ENV == 'GH_PAGES' ? '/vue-css-grid-dashboard-example/' : '/'
    // },
    generate: {
        dir: 'dist',
        subFolders: false,
        routes() {
            return dynamicRoutes
        }
    }
}
