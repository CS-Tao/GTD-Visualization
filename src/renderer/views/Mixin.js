export default {
  methods: {
    changeLayout () {
      if (this.$route && this.$route.meta && this.$route.meta.mode !== undefined) {
        this.$store.dispatch('changeRouterViewShowMode', this.$route.meta.mode)
      }
    }
  }
}
