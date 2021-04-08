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
    render: function (createElement) {
        let post = posts[this.post]
        if (!post) {
            return createElement('div', { class: 'blog' })
        }
        return createElement(post.vue.component, { class: 'blog' }, [])
    }
}
