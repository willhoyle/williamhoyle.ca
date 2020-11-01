<template lang="pug">
    div
        div.text-4xl.text-gray-800.mb-5 Projects
        div.flex.flex-wrap
            div(class="md:w-1/2 w-full").rounded.border.shadow.p-5
                div.text-xl.text-gray-800 
                    nuxt-link(to="/projects/teafile").front-page-links teafile.js
                div.text-gray-800 javascript library for teafile format to store time series as binary flat files
            
</template>
