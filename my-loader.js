const simpleGit = require('simple-git/promise')()
const path = require('path')

module.exports = async function (source, map, meta) {
    var callback = this.async();

    let info = await simpleGit.log([this.resourcePath])
    let createdAt = info.all.length ? (new Date(info.all[info.all.length - 1].date)).getTime() : null

    let updatedAt = info.all.length ? (new Date(info.all[0].date)).getTime() : null

    let parts = this.resourcePath.split(path.sep)
    let year = parts[parts.length - 2]
    let slug = path.basename(parts[parts.length - 1], '.md')
    let href = `/blog/${year}/${slug}`

    source = source.replace('---', `---\nupdatedAt: ${updatedAt}\ncreatedAt: ${createdAt}\nhref: ${href}\n`)
    console.log(meta);
    callback(null, source, map, meta)
}