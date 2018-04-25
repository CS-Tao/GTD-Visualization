<template>
	<div class="app-wrapper">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<header></header>
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
import { Header, Sidebar, AppMain } from '@/components/Layout'

export default {
  name: 'layout',
  components: {
    Header,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar () {
      // return this.$store.state.app.sidebar
    }
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
