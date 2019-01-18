<template lang="pug">
  div
    section.main-content.pad-top
      div.container
        .columns.is-centered.is-multiline
          .column.is-2
          .column.is-8.has-text-centered
            h1.is-size-name William Hoyle
            h4.is-size-4 Personal website for 
              span.has-text-primary projects
              | , 
              span.has-text-primary blog posts
              | ,
              span.has-text-primary  vegan things
              |  and
              span.has-text-primary  running 
          .column.is-2.has-text-right
            a(href="https://github.com/willhoyle")
              img(src="~/static/GitHub-Mark/PNG/GitHub-Mark-32px.png")

          .column.is-12
            .tile.is-ancestor
              .tile.is-vertical.is-12
                .tile
                  .tile.is-parent.is-vertical
                    article.tile.is-child.box
                      p.has-text-left.is-size-3.title
                        | Blog
                      article.media
                        figure.media-left.has-text-centered
                          p.is-size-5 Jan 20
                          p.is-size-5 2019
                        .media-content
                          .content
                              | Initial website launch
                      article.media
                        figure.media-left.has-text-centered
                          p.is-size-5 Jan 18
                          p.is-size-5 2019
                        .media-content
                          .content
                              | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                      article.media
                        figure.media-left.has-text-centered
                          p.is-size-5 Jan 18
                          p.is-size-5 2019
                        .media-content
                          .content
                              | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                      article.media
                        figure.media-left.has-text-centered
                          p.is-size-5 Jan 18
                          p.is-size-5 2019
                        .media-content
                          .content
                              | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                      article.media
                        figure.media-left.has-text-centered
                          p.is-size-5 Jan 18
                          p.is-size-5 2019
                        .media-content
                          .content
                              | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                      article.media
                        .media-content
                          .content.has-text-centered
                              nuxt-link(to="/blog") 
                                | See all posts
                                b-icon(icon="chevron-right")
                  .tile.is-parent
                    article.tile.is-child.box
                      p.title.is-size-6.has-text-right 
                        b-icon(icon="star" class="has-text-success")
                        | Featured Project

                .tile.is-parent
                  article.tile.is-child.box
                    // Put any content you want 
          
          
    section.main-content
      .container.container-fluid
        nuxt
    footer.footer
      .content.has-text-centered
        img.made-bulma(src="~/static/made-with-bulma--semiblack.png")
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style>
.pad-top {
  padding-top: 25px;
}
.made-bulma {
  height: 40px;
}
</style>