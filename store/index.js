import path from 'path'


const isProd = process.env.NODE_ENV == 'production'

export const state = () => {
    return {
        routes: [],
        posts: [],
        snippets: []
    }
}

import { getPosts } from '../util/helpers'

let posts = getPosts(
    require.context('~/content/blog/2020/', true, /\.md$/)
)

let drafts = getPosts(
    require.context('~/content/blog/drafts/', true, /\.md$/)
)

let snippets = getPosts(
    require.context('~/content/snippets/', true, /\.md$/)
)
console.log(posts);
export const actions = {
    async nuxtServerInit({ commit }) {
        if (!isProd) {
            posts = {
                ...posts,
                ...drafts
            }
        }
        commit("setPosts", posts)
        commit("setSnippets", snippets)
    }
}

export const mutations = {
    setPosts(state, posts) {
        state.posts = Object.entries(posts).map(([key, val]) => {
            return { key, attributes: val.attributes }
        })
    },
    setSnippets(state, snippets) {
        state.snippets = Object.entries(snippets).map(([key, val]) => {
            return { key, attributes: val.attributes }
        })

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