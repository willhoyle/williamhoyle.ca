---
title: Vue has too many UI frameworks
---
# Vue has too many UI frameworks

[[date]]

[[toc]]

Seriously, take a look for yourself: [https://github.com/vuejs/awesome-vue#responsive](https://github.com/vuejs/awesome-vue#responsive).

The top libraries:

- Quasar
- vue-material
- vuetify
- muse-ui
- buefy (Bulma CSS wrapper)
- element-ui
- BootstrapVue
- and more...

Now, before I start. I will say that there's merit to trying new ideas. Sometimes a new project is necessary in order to explore new concepts. 

##### This is not one of those situations.

All these libraries have the goal of providing generic, reusable UI components. The only thing that changes is the style. The CSS. The "look and feel". Material Design, Bulma, Bootstrap. They all look different but the concept of a `<Button>` will always remain the same.
## Duplicated code
The UI components are all the ones you know and love. The good old dropdown menu. The popup modal. The form components. The button. All these UI frameworks are re-implementing the same implementation details in 20 different codebases. It seems insane when you think about it. 

Now yes I agree, a button can be complicated. For example, Quasar's button implementation is [355 lines](https://github.com/quasarframework/quasar/blob/dev/ui/src/components/btn/QBtn.js). Buefy's button implementation is [106 lines](https://github.com/buefy/buefy/blob/dev/src/components/button/Button.vue). They have two completely different implementations but both work the same. Quasar has some additional functionality for hover/focus states. Would be nice if that functionality was in Buefy.

Let's say each project has 3 core developers. Let's say we only take the top 20 UI frameworks. That's 60 devs that could all be working under one roof. Imagine that. There's so much work to do. I've seen the bugs. I've seen the long road maps. There's no shortage of work. Why are we splitting ourselves up like this?

## Need to learn each framework's API

Web apps are instructed to import the components in various recommended ways. Most of the time globally, sometimes à la carte.

You can then use them in your templates:
```js
<template>
    <quasar-widget my-prop="val">

    </quasar-widget>
</template>
```

The problem is now I have to learn `<quasar-widget>` in Quasar. `<buefy-widget>` in Buefy. `<bootstrap-widget>` in BootstrapVue. I have to learn all the different names for props, events, components, slots. Multiply by N for every other framework in existence.

## What happens when Material Design goes out of style?
Seriously. It's "in" now but in 5 years who knows what UI paradigms will become hot. I'm excited for skeuomorphic design to make a comeback. Trends come and go. When you're locked in to a framework, that's it, you're locked in. Each library has coupled the implementation details (the JavaScript and HTML structure) with the CSS. There's no easy way to swap out the CSS with a couple lines of code.

When that new UI trend comes, we need to change frameworks and throw away our work and do a "rewrite".

## A solution

In truth, a solution already kind of exists. You can write your own CSS, overriding the included styles of the UI framework. I can import Quasar components into my app and override the specific classes in order to achieve my desired look.

There's something that feels hacky about doing it this way. I can only do that with my own CSS. In theory, I could integrate another CSS framework with a tailwind style `@apply my-class`. It's not a one line change though. It would be nice if I could just import the CSS framework I want to use, and the UI framework keeps working without a hitch.

In a way, we're really close to a solution like this. It would take a bit of work. Someone would need to use the most mature frontend framework as a base. They would rewrite the styles in a more generic and extensible way. 

Then, each CSS framework (Bulma, Bootstrap, Material Design, etc...) would apply the styles from their library to the generic class names in the generic UI framework.

For example, a button:

```css
/* bulma.css */
.generic-btn {
    @apply button;
}
/* boostrap.css */
.generic-btn {
    @apply btn;
}
```


Then I can just: `npm install vue-bulma`
```javascript
import 'bulma.css'
```

## Tailwind UI
I got the idea for this post because I discovered that TailwindCSS now offers a product called TailwindUI. This is great news for them. I hope they can make some money and improve TailwindCSS immensely. 

Here's the problem though. They only offer the components as HTML code. Many examples say `Requires JavaScript`. Here's a sample from their preview page for an input element:

```html
<label for="company_website" class="block text-sm font-medium text-gray-700">
    Website
</label>
<div class="mt-1 flex rounded-md shadow-sm">
    <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
    http://
    </span>
    <input type="text" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com">
</div>
```
The example below probably won't render the same as on the website even though I'm also using TailwindCSS on this blog. 

<div class="mb-5">


<label for="company_website" class="block text-sm font-medium text-gray-700">
    Website
</label>
<div class="mt-1 flex rounded-md shadow-sm">
    <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
    http://
    </span>
    <input type="text" name="company_website" id="company_website" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com">
</div>

</div>


My first thought was: where are the Vue components for these elements? I have to reimplement all the JavaScript logic for an input element again? That's so 2018.

But it makes sense. There's no way they could write an entire UI framework in Vue, React, Svelte, Angular, etc... So they are stuck doing this instead. 

Imagine if instead, they took a framework like Quasar, stripped/modified the entire codebase to make it work with TailwindCSS styles. I think it's a missed opportunity. Not just for TailwindCSS but for all other CSS frameworks.

## But won't this lead to bloat?
When you go to the [buefy.org](https://buefy.org) page, you are greeted with a big purple welcome screen. One of the features they list is lightweight. I understand the appeal of marketing your library as the lightweight option.

But Webpack and build pipelines have come a long way. We have dead-code elimination for JavaScript now. We have PostCSS and PurgeCSS for unused CSS too. As long as the libraries are built in a modularized way, unused components are not included in the bundle.

With everything setup correctly, you only pay for what you use.

## Closing thoughts

I don't think being able to override the CSS of existing UI frameworks is good enough. We need a generic UI framework library. It should expose generic class names on its HTML elements like `.generic-button` or `.generic-modal`. Each CSS framework could then target those generic class names. 

In a way, doing it this way would take us back to how it all began regarding HTML and CSS. They are decoupled from the logic written in the JavaScript. I hope we can find a way to make this work!