## Grep notes folder

`grep -nr string content/notes`

Since I'll be doing this often, I'll add an alias for this command in my `.zshrc` file:

`alias sn=grep -nr $1 ~/projects/williamhoyle.ca/content/notes`

usage: (sn=search notes)
```shell
$ sn computer
/home/will/projects/williamhoyle.ca/content/notes/grepping-notes-folder.md:10:`sn computer`
/home/will/projects/williamhoyle.ca/content/notes/grepping-notes-folder.md:13:When I'm at the computer, it's easier to grep for the exact thing I'm looking for instead of going to this page.

```

When I'm at the computer, it's easier to grep than search a webpage.

### Future enhancements
- `sn` could parse the filepaths returned by grep and pretty print the note (and removes duplicates).

