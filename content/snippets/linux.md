---
title: "linux snippets"
---

# linux notes

### Kill node process when you get EADDRINUSE :::8080

sudo netstat -lpn |grep :'8080'
Find the process id then:
kill -9 1192


--------------------------------------------------
Tags: ubuntu, linux
Move a window in Ubuntu with the just the keyboard
because the top bar is hidden or whatever

Alt + F7 then move with arrows and press Enter to confirm



--------------------------------------------------
https://www.howtoforge.com/tutorial/linux-command-line-navigation-tips-and-tricks-part-1/
Tags: command line, tips, navigation, cd

Say I'm in the following directory

$ pwd
/home/will/Downloads

then I:

cd /usr/lib

Now I can switch to the previous dir by doing:

cd -



--------------------------------------------------
Command line cursor navigation

Move to beginning: Ctrl+a
Move to end: Ctrl+e
Move back one word: Alt+b
Move forward one word: Alt+f

Type: history to see a list of commands you did
then !#### to run that command

Search previous commands: Ctrl+r, type search then keep pressing Ctrl+r to see the next one

Cancel command: Ctrl+c

Delete from the cursor to the begining of the line: Ctrl+u
Delete from cursor to end of line: Ctrl+k
Paste back what you cut with above commands: Ctrl+y

Clear screen: Ctrl+l 

What directory am I in?: pwd

If you know the directory but maybe not the path leading up to it just:
cd `locate some-long-dir`


--------------------------------------------------
When the wifi stops showing the list of wifi access points in the list (ubuntu)

sudo service network-manager stop
sudo service network-manager start







--------------------------------------------------