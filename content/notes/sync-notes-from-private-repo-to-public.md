## Publishing notes, blog posts, project pages

This site is hosted with netlify. I point netlify to my public repository. Sometimes, I want to work on blog posts or new ideas in private before the polished version gets pushed to the public repo.

### notes
I usually always want to sync my entire notes directory without really thinking about it. For this, I can use the following utility that is in my `.zshrc`:
`syncnotes` which is just an alias:
```shell
syncnotes() {
    git stash
    git add content/notes/*.md
    git commit -m "Sync notes"
    git checkout master
    git checkout private -- content/notes/*.md
    git commit -m "Update notes for public repo"
    git push origin master
    git checkout private
    git stash apply
}
```
No error handling but whatever.

Before pages and updates to my public site get pushed to my public remote repo