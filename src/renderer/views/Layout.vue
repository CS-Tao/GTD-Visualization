<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<app-header></app-header>
      <el-container :class="{'el-container-full-screen':isAppFullScreen}">
        <el-aside :class="['el-aside-' + routerViewMode]">
          <app-router-view></app-router-view>
        </el-aside>
        <el-main :class="['el-main-' + routerViewMode]">
          <app-main></app-main>
        </el-main>
      </el-container>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    },
    ...mapGetters([
      'isAppFullScreen',
      'routerViewMode'
    ])
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
