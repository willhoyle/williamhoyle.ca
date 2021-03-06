const posts = require('../../util/helpers.js').getPosts(
  require.context('~/content/', true, /\.md$/)
)

export default {
  layout(context) {
    return 'blog'
  },
  async asyncData({ params, route }) {
    let post = route.path
    try {
      return {
        post,
        meta: posts[post].attributes
      }
    } catch (err) {
      console.debug(err)
      return false
    }
  },
  created() {},
  render: function(createElement) {
    if (!posts[this.post]) {
      return createElement('div', {class: 'blog'})
    }
    return createElement(posts[this.post].vue.component, {class: 'blog'}, [])
  }
}
