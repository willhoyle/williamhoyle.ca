---
title: Vue has too many UI frameworks
---
# Vue has too many UI frameworks

Seriously, take a look for yourself: [https://github.com/vuejs/awesome-vue#responsive](https://github.com/vuejs/awesome-vue#responsive).

The top libraries:

- quasar
- vue-material
- vuetify
- muse-ui
- buefy (Bulma CSS wrapper)
- element-ui
- BootstrapVue
- and more...

Now, before I start. I will say that there's merit to trying new ideas. Sometimes a new project is necessary. This is not one of those situations.

## Duplicated code
I'll start with the obvious. All these libraries have the goal of providing generic, reusable UI components. Web apps are instructed to import the components (in various ways, sometimes globally, sometimes a-la-carte).

Click any one of the libraries mentioned above. They all look different right?

The problem is 