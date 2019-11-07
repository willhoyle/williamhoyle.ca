const resolve = require.context("~/content/", true, /\.md$/)
const imports = resolve.keys().map((key) => {
    return resolve(key);
});
const posts = resolve.keys().reduce((posts, key, idx) => {
    const [, name] = key.match(/\/(.+)\.md$/);
    posts[name] = imports[idx]
    return posts
}, {})

export default {
    layout(context) {
        return 'blog'
    },
    async asyncData({ params }) {
        try {
            return {
                post: params.post
            }
        } catch (err) {
            console.debug(err)
            return false
        }
    },
    created() {

    },
    render: function (createElement) {
        return createElement(
            posts[this.post].vue.component, []
        )
    }
}