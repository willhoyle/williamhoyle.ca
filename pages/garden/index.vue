<template lang="pug">
div
  .text-4xl.text-gray-800.leading-none garden
  .text-lg.text-gray-600 notes on how to take care of my garden

  .markdown-body
    p.
      I don't know much about gardening but I moved into a house with a beautiful garden and I want to try to keep it that way. This will serve as my reference page for all things gardening and keeping these things alive.

    h2 Garden Map

    p.
      I'll be updating this is the general map of where everything is:
    img(src='/garden/map.svg')

    h2 Plants

    .grid.grid-cols-6.gap-6
      plant-card.col-span-6(
        class='sm:col-span-2',
        name='Garden Phlox',
        src='/garden/phlox.jpg',
        alt='Garden phlox in full bloom',
        comment='The first summer we moved in, I was convinced these were weeds because they grew the whole summer without blooming. Without the flowers, they look kind of invasive.',
        flowers='August and September'
      )

      plant-card.col-span-6(
        class='sm:col-span-2',
        name='Juniper',
        src='/garden/juniper.jpg',
        alt='Juniper tree',
        comment='My favourite plant in the garden and there\'s four of them!',
        flowers='I don\'t think these flower?'
      )
        h3 Notes
        h4 2020
        p I lightly trimmed these guys early summer (late June). I had just moved in to the house. I think this trim happened too late.

        p One thing to keep in mind is Juniper plants don't grow new foliage on old bark. Consequently, you have to be mindful when giving them a haircut. You don't want to end up with irrepareable holes in the canvas.
      plant-card.col-span-6(
        class='sm:col-span-2',
        name='Snowdrops',
        src='/garden/snowdrops.png',
        alt='Snowdrops',
        comment='These are so lit. First thing to come out of the ground in the Spring. Is Toronto even a Canadian city? It\'s so warm here.',
        flowers='Late-March (First warm days in spring) and April'
      )
</template>

<script>
export default {}
</script>

<style>
</style>