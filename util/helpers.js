export const getPosts = (requireContext) => {
    const imports = requireContext.keys().map((key) => {
        return requireContext(key);
    });
    return requireContext.keys().reduce((posts, key, idx) => {

        let name = key.replace(".", "")
        name = name.replace(".md", "")
        posts[name] = imports[idx]
        return posts
    }, {})
}

