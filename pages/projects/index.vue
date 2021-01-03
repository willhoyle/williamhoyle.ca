<template lang="pug">
div
  .text-4xl.text-gray-800.mb-5 Projects
  .flex.flex-wrap.space-x-4
    .rounded.border.shadow.p-5(class='md:w-1/2')
      .text-xl.text-gray-800
        nuxt-link.front-page-links(to='/projects/teafile') teafile.js
      .text-gray-800 javascript library for teafile format to store time series as binary flat files
    .rounded.border.shadow.p-5(class='md:w-1/2')
      .text-xl.text-gray-800 
        nuxt-link.front-page-links(to='/fitness') strava training log clone
      .text-gray-800 visual mileage timeline shown with svg graphics
</template>
