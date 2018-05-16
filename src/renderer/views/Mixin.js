export default {
  methods: {
    changeLayout () {
      // console.log(this.$route.meta.mode)
      if (this.$route && this.$route.meta && this.$route.meta.mode !== undefined) {
        this.$store.dispatch('changeRouterViewShowMode', this.$route.meta.mode)
      }
      this.$triggerResize()
    }
  }
}
