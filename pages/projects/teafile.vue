<script>
import teafile from '../../content/projects/teafile.md'

export default {
  layout(context) {
    return 'default'
  },

  created() {},
  render: function(createElement) {
    console.log(teafile)
    return createElement(teafile.vue.component, [])
  }
}
</script>
