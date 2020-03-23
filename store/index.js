export const state = () => {
    return {
        routes: [],
        posts: []
    }
}

const posts = require('../util/helpers.js').getPosts(
    require.context('~/content/', true, /\.md$/)
)

export const actions = {
    async nuxtServerInit({ commit }) {
        commit("setPosts", posts)
    }
}

export const mutations = {
    setPosts(state, posts) {
        state.posts = Object.entries(posts).map(([key, val]) =>
            ({ key, attributes: val.attributes })
        )
    }
}

export const getters = {
    allTags(state) {
        return Array.from(state.posts.map(({ attributes: { tags } }) => {
            return Array.isArray(tags) ? tags : []
        })
            .reduce((set, tags) => {
                tags.forEach(tag => {
                    set.add(tag)
                })
                return set
            }, new Set())).sort((a, b) => {
                return a.localeCompare(b)
            })
    },
    allTagsWithPosts(state) {
        return Array.from(
            state.posts.reduce((map, { attributes }) => {
                let { tags = [] } = attributes
                tags.forEach(tag => {
                    let postsForTag = map.get(tag) || []
                    map.set(tag, postsForTag.concat(attributes))
                })
                return map
            }, new Map()))
            // sort tags
            .sort(([a, valueA], [b, valueB]) => {
                return a.localeCompare(b)
            })
            //sort posts within a tag by publishedAt date
            .map(tag => {
                tag[1].sort((a, b) => {
                    return new Date(a.publishedAt) < new Date(b.publishedAt)
                })
                return tag
            })
    }
}