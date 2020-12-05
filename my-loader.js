const simpleGit = require('simple-git/promise')()
const path = require('path')
const { DateTime } = require('luxon')
module.exports = async function(source, map, meta) {
  var callback = this.async()

  let info = await simpleGit.log([this.resourcePath])
  let createdAt = info.all.length
    ? new Date(info.all[info.all.length - 1].date).getTime()
    : null

  let updatedAt = info.all.length ? new Date(info.all[0].date).getTime() : null

  // we are assuming "content" will be here. if we made this more
  // generic we'd allow that to be customized
  // path.sep = /home/will/projects/williamhoyle.ca/content/blog/2020/filename.md

  let parts = this.resourcePath.split('content')

  let href = parts.pop()
  // remove extension
  href = href
    .split('.')
    .slice(0, -1)
    .join('.')

    
  // enrich the yaml frontmatter before it goes through the loader
  // then, we'll be able to access this info inside our templates
  source = source.replace(
    '---',
    `---
updatedAt: ${updatedAt && DateTime.fromMillis(updatedAt).toFormat('yyyy LLLL d')}
createdAt: ${createdAt && DateTime.fromMillis(createdAt).toFormat('yyyy LLLL d')}
jsCreatedAt: ${createdAt}
jsUpdatedAt: ${updatedAt}
href: ${href}
`
  )
  callback(null, source, map, meta)
}
