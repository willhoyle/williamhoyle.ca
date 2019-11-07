const pkg = require('./package')
import Mode from 'frontmatter-markdown-loader/mode'

import { getRoutes } from './util/helpers.js'

import path from 'path'
module.exports = {
  mode: 'universal',

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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: 'http://localhost:3000'
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
            root: "dynamicMarkdown"
          }
        }
      })
      config.module.rules.push({
        test: /\.md$/,
        loader: path.resolve('./my-loader.js'),

      })
    }
  },
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ],
  generate: {
    subFolders: false,
    routes() {
      return getRoutes()
    }
  }
}
