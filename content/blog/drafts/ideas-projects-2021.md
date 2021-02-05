---
title: Ideas and projects in 2021
---
# Ideas and projects in 2021

I’ve been meaning to write a list of all ongoing projects and ideas occupying my mind. Projects I’ve started but haven’t finished. Projects I’ve thought of but haven’t had time to start. Half-baked ideas that could become projects one day. Everything, I guess.

## Projects

### [financialcpp.com](https://financialcpp.com)
![financialcpp.com](/fpp.png)
[Project page](/projects/financialcpp)

I wrote a high performance c++ stock market trading framework. I'm currently writing nodejs bindings to interface with the c++ code. The bindings will allow me to write an apollo server layer to query the js bindings from the browser. This is a multi-year project in the making. The plan is to release a first version in the next few months.

I try to remind myself: ugly code that ships is more useful than that elusive "perfect design" with clean code. There's no such thing as the perfect abstraction.


Why not use an existing solution? Partly to scratch my own itch but also, the other solutions weren’t a joy to work with. I’m hoping I can inspire future algo traders with a library that's actually fun to use. I want to abstract away the boring parts like data storage, data providers, live trading with interactive brokers, charting, horizontall scaling backtests in the cloud. The only thing users need to worry about is the strategy and money management.

All software has a learning curve. My aim is to reduce it by teach as much as possible by writing high quality api documentation, tutorials and examples.

### [eatplants.app](eatplants.app)
![eatplants.app](/eatplants.png)

A food-tracking app, without the food tracking. If you need to log food entries. this isn't for you. Use a traditional food tracker instead.

No one likes tracking food. It's annoying trying to calculate portions on a big meal (recipes can help, I'll admit). Here's my vision for this app:
- Food database with all plant-based foods. No shite junk food
- You never log food entries
- The app will have a page with recipes curated by me with beautiful pictures of food. Will consider opening it up to others when I figure out a good publishing platform
- And no, this won't be one of those recipe websites that have 30 pictures and my whole life story


Sometimes I lack inspiration when figuring out what to cook. So the workflow I envision is:
1. Go to recipes section of app
2. Pick a few things I want to eat for the day, or what I have ingredients for
3. The app will have my macros and micro nutrients saved. It will calculate the proportions for each meal, taking into account my macros/micros
4. The cool part is the food optimizer. It uses [a linear programming solver](https://github.com/JWally/jsLPSolver) written in js. All optimizations can be done in the browser!

To be honest, I'm not totally inspired by this idea anymore. I started working on it when I was newly vegan. Figuring out what to eat was hard. Getting enough protein was a conscious effort. As time went on, I just got used to it. I have my go-to meals now. It's not as much of an issue. I might come back to it when I have more down time

### New web-browser: Gue Browser
#### vuejs-esque template but golang instead of javascript + css

The idea is to create a different kind of web, where instead of the main language being html + js + css it’s actually go + vue + some subset of css = I’m calling it gue lol.

Under the hood it would be an executable, just like Chrome, that users download to their PC.

So here’s the concept: you know how when you navigate to google.com. It’s an HTML encoded file right? It has some script elements in there and the browser executes the js. You know, like the web that we know today basically. Ok so now imagine the same thing in my browser. You go to google.com, you set a header accept: gue/guex. The payload you receive is this vue-like file where the contents of the template are written in pug and the script is written in Go! I chose go because it compiles quickly. So I’m not writing an interpreter, it will actually compile the file, then run it as a sub process and communicate with the drawing thread via socket/port. It would be pretty cool. 

Even better is if you did a good job separating concerns, you could write go gui apps too with this thing since it will need to implement a drawing lib. But you’d be writing it in this beautiful gue file I described above so yea I dunno feel like it’s be nice

## Ideas I want to flesh out via blog posts
I've come to realize that blogging/writing is the best way to flesh out new ideas. I get clarity on a topic much quicker when I write down what I know. Once I start writing, I find out what I don't know. It usually leads to learning something new, or changing a previous misconception on a topic. 

### Command-line for everything
#### This one is kind of savage
This is more an idea than a project that can be executed. I want to explore what life would be like if everything was done through a command line. Is it a better world? Can all gui be solved with a command line? These are questions I’d love to dive deep into. I’ll be saving some of these ideas for a blog post. 



Continuum 2020

Remake of the game. Show pictures etc



Things that are wrong about the web
Just me complaining about things I run into that piss me off. Every time it happens, I write it down. I have this massive list. I love complaining about faulty software.
