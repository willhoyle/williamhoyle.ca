export const getPosts = (requireContext) => {
    const imports = requireContext.keys().map((key) => {
        return requireContext(key);
    });
    return requireContext.keys().reduce((posts, key, idx) => {
        const [, name] = key.match(/\/(.+)\.md$/);
        posts[name] = imports[idx]
        return posts
    }, {})
}

