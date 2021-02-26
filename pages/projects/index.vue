<template lang="pug">
.reset
  .text-4xl.text-gray-800.mb-5 Projects
  .grid.gap-x-8.gap-y-4.grid-cols-3.text-xl
    .w-full.rounded.border.shadow.p-5.col-span-3(class='md:col-span-2 md:mb-0')
      .preview(class='')
        a(href='/fpp.png')
          img(src='/fpp.png')
      .text-xl.text-gray-800 
        a.front-page-links(href='https://financialcpp.com') financialcpp
      .text-gray-800 high performance c++ stock market backtester with nodejs bindings. Automate trading strategies with javascript. All performance critical paths are executed in c++
    .w-full.rounded.border.shadow.p-5.col-span-3(class='md:col-span-1 md:mb-0')
      .preview(class='')
        nuxt-link(to='/projects/teafile')
          img(src='/teafile.png')
      .text-xl.text-gray-800 
        nuxt-link.front-page-links(to='/projects/teafile') teafile.js
      .text-gray-800 javascript library for teafile format to store time series as binary flat files. Used in financialcpp.
    .w-full.rounded.border.shadow.p-5.col-span-3(class='md:col-span-2 md:mb-0')
      .preview(class='')
        a(href='https://eatplants.app')
          img(src='/eatplants.png')
      .text-xl.text-gray-800 
        a.front-page-links(href='https://eatplants.app') eat plants
      .text-gray-800 A plant-based food tracking app, without the food tracking. Removes the mental overhead of thinking about what to eat, grocery lists, macro/micronutrients, weight targets
</template>
