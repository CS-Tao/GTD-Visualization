<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <dashboard></dashboard>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import Dashboard from '@/components/Dashboard'

export default {
  name: 'AppMain',
  components: { Dashboard },
  computed: {
    cachedViews () {
      return this.$store.state.cachedViews.cachedViews
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  height: 100%;
}
</style>
