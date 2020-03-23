const posts = require('../../util/helpers.js').getPosts(require.context("~/content/", true, /\.md$/))


export default {
    layout(context) {
        return 'default'
    },
    async asyncData({ params, route }) {
        let post = route.path.replace('/blog/', '')
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
    created() {

    },
    render: function (createElement) {
        if (!posts[this.post]) {
            return createElement("div")
        }
        return createElement(
            posts[this.post].vue.component, []
        )
    }
}