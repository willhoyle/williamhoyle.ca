---
title: Ideas and projects in 2021
---
# Ideas and projects in 2021

All ideas and projects on my mind

[[toc]]
## Projects
### Financialcpp
**[financialcpp.com](https://financialcpp.com)**
![financialcpp.com](/fpp.png)

I wrote a c++ stock market trading framework. I'm currently writing nodejs bindings to interface with the c++ code. The bindings will allow me to write an apollo server layer to query the js bindings from the browser. This is a multi-year project in the making. The plan is to release a first version in the next few months.

**Ship early, ship often**

I try to remind myself: ugly code that ships is more useful than that elusive "perfect design" with clean code. There's no such thing as the perfect abstraction. So just write code.

**Why build it?**

Why not use an existing solution? Partly to scratch my own itch but also, the other solutions weren’t a joy to work with. I’m hoping I can inspire future algo traders with a library that's actually fun to use. I want to abstract away the boring parts like data storage, data providers, live trading with interactive brokers, charting, horizontally scaling backtests in the cloud. The only thing users need to worry about is the strategy and money management logic. Providing an easy to use javascript library will be the key in making this lib a joy to work with.

**Documentation that makes you want to go wow I want to use this!**

All software has a learning curve. My aim is to reduce it by teaching as much as possible via high quality api documentation, tutorials and examples. 

A prime example of good documentation is vuejs. The onboarding process is quick and all tutorials have real examples and snippets that can be pasted into your own project. It makes it a joy to work with. There's value in making a tool nice to work with. I'll be looking to emulate a similar experience with my library.

### eatplants.app
**[eatplants.app](https://eatplants.app)**
![eatplants.app](/eatplants.png)

A plant-based food-tracking app, without the food tracking. If you need something that logs food entries, this isn't for you. Use a traditional food tracker instead.

No one likes tracking food. It's so tedious and boring. It's annoying trying to calculate portions for a big meal (recipes can help capture common food combinations I guess). You always feel like you're playing catchup.

Tracking food should use a proactive approach. For example, a nice way would be to choose food and recipes from a curated list and the app takes care of the rest (grocery list, cooking plan, amounts based on calories, etc..)


**Workflow**

The workflow for this tool looks as follows:
1. Go to eatplants.app
2. Enter your calorie requirements
3. Choose from beautifully curated collections of foods that you'll eat for the next few days. Most collections would be between 1-5 days. 
4. From this point on, there's no cognitive overhead. You just execute the plan eatplants.app gives you
5. The app spits out a grocery list for all the food you chose
6. Buy the food. Again, the list is made by the app so no actual mental overhead incurred here. You just follow the list
7. Cook the food according to directions. This is where collections have leeway to guide your journey. Some collections might tell you to pre-prepare a few things the night before. Some might guide you through a meal-prep session. It's flexible and collection specific.

**Collections of food**

Expanding on 7. You can create some very interesting collections of foods that still fulfill the calorie and macro requirements of a user. Let's say I really like peas. I decide that eating 5 cans of peas a day is the type of life I want to live. I could create a 3 day collection with peas as the focal ingredient. And other foods fill in the gaps for micro nutrient requirements. The tool will make suggestions to fill those gaps in.

**Reducing food tracking fatigue**

My thinking is, calorie counting isn't supposed to be done all year round. It's not sustainable. You end up burning out or always feeling like you're behind. Eating should be intuitive. This app only tries to train that intuition, not replace it. It also tries to automate the boring parts of cooking. 

**App Internals**

Here's some of the internals for this app:
- Food database (postgres) with all plant-based foods
  - food
  - recipes (combines foods, with specific proportions)
  - collections (combines foods, recipes and other collections but is flexible about proportions). For example, you could say I want to exlusively eat watermelon (a food) and toast+avocado (recipe) tomorrow. That would technically be a collection
- You never log food entries. The app tells you, not the other way around
- The app will have a page with vegan recipes curated by me with beautiful pictures of food. Will consider opening it up to others when I figure out a good publishing platform. Strapi looks promising.
- And no, this won't be one of those recipe websites that have 30 pictures per recipe with a wall of text. Just clean looking recipes and collections of foods
- Potentially provide a public API. I noticed most main websites don't sell API services tapping into their food database. Think of all those wordpress blogs or ideas people have but can't tap into an easy to use API


**Easy food database management**

The nice part here is because this is a plant-based website, I don't need to care about keeping my food database up to date with commercial products. A potato will always be a potato.

**Existing solutions**

**eatthis** kind of does all this but I want this to focus on exclusively vegan food (and whole-food plant based when possible) and a curated approach to building recipes. The whole week's recipes and meals should follow a cohesive plan. **eatthis** randomly generates meals that fulfill the calorie requirements but they kind of forgot that humans don't want to eat "protein powder with water" for breakfast.

**Tagging system**

Can also add a tagging system to the collections and recipes. Like: Under X-mins prep, or tools required (blender, instant pot etc...)

### Apple tv app for the Concept 2 rower

I recently started rowing with a Concept 2 rower (PM5) which has a bluetooth interface. The rower can stream real-time metrics with this interface.

![Pic of my rower](/concept-2.jpg)

I looked around and didn't find any native tvOS apps taking advantage of this. How I envision this working is connecting the Concept 2 to the Apple TV via bluetooth and streaming rowing metrics to the screen. I'll start with that for v0.1 and go from there. Maybe v0.2 streams content to the screen. I have some ideas for streams. The app could stream classes or cool stuff like what Zwyft does.

I did a brainstorming session to create a first plan on how I'll build this thing. Take a look [here](/blog/2021/roadmap-tvOS-app-streaming-concept-2-metrics)
### New web-browser: Gue Browser
#### html + go + vue-style single-file template 
Files will have a .gue extension. 

The idea is to create a different kind of web, where instead of the main language being html + js + css it’s actually go + vue + some subset of css = gue. A very ugly name and I love it.

Under the hood it would be an executable, just like Chrome, that users download to their PC and run like a browser.

html and javascript are the defacto languages of the web for traditional web browsers. It would work the same as Chrome. Instead of html and js, it's html + go. You request google.com in the same way but the underlying technology uses html + go.

The payload you receive is this vue-style single-file template where the contents of the template are written in html and the script is written in go! I chose go because it compiles quickly. I wouldn't be writing an interpreter, it will actually compile the file, then run it as a sub process and communicate with the drawing thread via socket/port. 

I'd use a library like [https://github.com/hashicorp/go-plugin](https://github.com/hashicorp/go-plugin). The main drawing would communicate with the user's website via this library (it abstracts the process-process communication and allows you to communicate with the main drawing thread from the sub-process as if you were in the same process. Cool!)

I'd need to look into security. Probably by whitelisting which `imports` are allowed. Basically, make sure the executable can't be compiled to do something malicious to the user's computer. 

Even better is if you did a good job separating concerns, you could write go gui apps too with this thing since the browser will need to implement a drawing lib. At the end of all this, you’d get to write apps in this beautiful vue-style and get native speeds via compiled code.

The software stack could look like this:

- go-skia or sdl for drawing things to the screen in a cross-platform way
- the core functionality written in go. You'd need to expose an api that users can just `import gue` and get started right away
- a `gue` cli to compile apps: gue compile, gue dev, etc...
- implement browser APIs similar to the current web. (access to file system for me is huge. If you make it safe, you could give each website a folder to write to for app state)

What a .gue file could look like:
```html
<template>
    <div class="container">
        {{hello}}
    </div>
    <button @click="onClick">
        World
    </button>
</template>

<script lang="go">
// go code modifying {{hello}} when the "World" button is clicked
</script>

<style>
    // css? sass? scss? custom styling lang?
</style>
```
### Continuum 2020
[continuum2020.ca](https://continuum2020.ca)
![/continuum.png](/continuum.png)

Remake of the greatest massively multiplayer game of all time, Subspace/Continuum. I joined a game-off on itch.io in October to motivate me to actually work on this. I managed to get something up and running with Matter.js for the canvas and physics, and WebRTC for the game packets. I haven't had time to reach a fully functional game and user system but the plan is:

- Continue working on the game and scene logic. Keep it simple for the first version
- Simple game mode called elimination which is just a free-for all game. Everyone against everyone, start with 5-10 lives
- Keep track of stats and leaderboard because that's what drives people to compete and get better. Otherwise why would you play if you don't get recognition?
- Prize money to get users playing? 
- Release that stable version to the wild and see how it evolves. Squad 5v5 is the obvious next choice. Then implementing different ship types and game types(javelin)

## Ideas
I'm starting to realize writing publicly is the best way to flesh out new ideas. I get quicker clarity on a topic when I write things down in a way that is consumable by an audience. Once I start writing, it becomes obvious what I don't know. It usually leads to learning something new, or changing a previous misconception on a topic. 

Even better, writing is such a good way to exchange ideas with others. I get the occasional email from readers or users of code and apps I wrote. I like to speak with others and see their perspective. In fact, email me your thoughts, any! Email is in the footer of every page on this site.

### Command-line for everything
This is more an idea than a project that can be executed. I want to explore the idea: what if everything was done on a command line. Is it a better world without Excel, rich GUIs, and code bloat? Can all GUI patterns be solved with a command line tool or terminal UI? These are questions I’d love to dive deep into. My current biases tell me no. We love visually pleasing interfaces. We like flashy things. Can a terminal UI provide the same thing without a visual framework like Material Design? I’ll be expanding on some of these ideas for a blog post:

- Answer the question: what are we gaining from all these box-shadows, colors, images that can't be replaced by clean, text-based interfaces that use colours and simple outlines for highlighting areas of interest
- I believe we will come to the conclusion that what makes terminal interfaces standout is the keyboard centric philosophy. I hate switching to my mouse. What if everything was vim-esque? I'll explore that concept.

### Documenting the web's unpleasant side
I've accumulated a big list of things that make the current web annoying.

- UI patterns I hate
- Bugs that are supposed to be "features"
- "Integrations". Notice how if you want to launch a SaaS now, you eventually have to play nice with other systems and apps. You'll always have users asking for integration with other SaaS tools. Is this even a good pattern? I'll explore my grievances on that too
