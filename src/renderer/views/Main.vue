<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<app-header></app-header>
      <!-- <app-router-view></app-router-view> -->
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
import { AppHeader, Sidebar, AppMain, AppRouterView } from '@/components/Layout'

export default {
  name: 'layout',
  components: {
    AppHeader,
    Sidebar,
    AppMain,
    AppRouterView
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    }
  },
  mounted () {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/renderer/styles/mixin.scss";
	.app-wrapper {
	  @include clearfix;
	  position: relative;
	  height: 100%;
	  width: 100%;
	}
</style>
