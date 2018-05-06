<template>
  <div>
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <section class="app-main" style="min-height: 100%">
      <transition name="fade" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'

export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      //   return this.$store.state.tagsView.cachedViews
      return [];
    },
    isCollapse () {
      return !this.sidebar.opened
    },
    ...mapGetters([
      'sidebar'
    ])
  },
  components: { Hamburger },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    }
  },
};
</script>

<style lang="scss" scoped>
.hamburger-container {
  line-height: 58px;
  height: 50px;
  // float: left;
  padding: 0 10px;
}
</style>

