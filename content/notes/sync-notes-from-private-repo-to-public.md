---
---
## Publishing notes, blog posts, project pages

This site is hosted on netlify. I tell netlify to build a public repository every new commit. I have a few workflows depending on what I'm doing:

### blog or projects
Sometimes, I want to work on blog posts or new ideas in private before the polished version gets pushed to the public repo. I can use the following command:

```bash
publish "git message>" file1 file2 file3
publish "blog(publish): my-post" content/blog/my-post.md content/blog/image.png
```

```bash
publish() {
    # commit files I want to sync to public
    git add $2 $3 $4 $5 $6 $7 $8 $9 # maybe one day I'll learn how to slice args in bash lol
    git commit -m $1
    git stash

    # checkout to master
    git checkout master
    git checkout private -- $2 $3 $4 $5 $6 $7 $8 $9
    git commit -m $1

    # publish to public
    git push origin master

    # back to private branch
    git checkout private
    git stash apply
}
```
### notes
I usually always want to sync my entire notes directory without really thinking about it. For this, I can use the following utility that is in my `.zshrc`:
`syncnotes` which is just an alias:
```bash
syncnotes() {
    git add content/notes/
    git commit -m "Sync notes"
    git stash
    git checkout master
    git checkout private -- content/notes/
    git commit -m "Update notes for public repo"
    git push origin master
    git checkout private
    git stash apply
}
```
No error handling but whatever, it works

Before pages and updates to my public site get pushed to my public remote repo