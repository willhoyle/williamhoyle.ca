let fs = require('fs')
let path = require('path')

const simpleGit = require('simple-git/promise')(path.resolve(__dirname, "../"))
console.log(path.resolve(__dirname, "../"));

// List all files in a directory in Node.js recursively in a synchronous fashion
var walkSync = function (dir, filelist) {
    let files = fs.readdirSync(dir)
    filelist = filelist || []
    files.forEach(function (filename) {
        let filepath = path.join(dir, filename)
        let stat = fs.statSync(filepath)
        if (stat.isDirectory()) {
            filelist.push({ filepath, filename, stat })
            filelist = walkSync(filepath, filelist)
        } else {
            filelist.push({ filepath, filename, stat })
        }
    })
    return filelist
}

const blogDir = path.join(__dirname, '../pages/blog')

const getRoutes = async () => {
    let files = walkSync(blogDir)
    console.log(files);
    let routes = await Promise.all(files.map(async file => {
        let info = await simpleGit.log([`--diff-filter=A`, `--`, file.filepath])

        let route = file.filepath.split('posts/').pop()
        if (file.filename.indexOf(".md") !== -1) {
            route = route.replace(".md", "")
        }

        return {
            route,
            payload: {
                isDir: file.stat.isDirectory(),
                createdAt: file.stat,

                // modifiedAt/
            }
        }
    }))
    console.log(routes);
    return routes.filter(_ => _)
}

// const getRecentPosts = async () => {
// }

module.exports = {
    getRoutes
}