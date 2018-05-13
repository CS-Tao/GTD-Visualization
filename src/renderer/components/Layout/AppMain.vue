<template>
  <div>
    <section class="app-main" style="min-height: 100%">
      <transition name="fade" mode="out-in">
        <keep-alive :include="cachedViews">
          <!-- <router-view></router-view> -->
          <dashboard></dashboard>
        </keep-alive>
      </transition>
    </section>
  </div>
</template>

<script>
import Dashboard from '@/views/Dashboard'

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
</style>
