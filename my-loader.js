const simpleGit = require('simple-git/promise')()

module.exports = function (source, map, meta) {
    var callback = this.async();
    simpleGit.log([`--diff-filter=A`, `--`, this.resourcePath]).then(info => {
        console.log(info);
        callback(null, source, map, meta)
    })
    return source
}