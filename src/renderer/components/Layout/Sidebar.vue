<template>
<div>
  <scroll-bar>
    <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <sidebar-item :routes="router"></sidebar-item>
    </el-menu>
  </scroll-bar>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarComponents/SidebarItem'
import ScrollBar from './SidebarComponents/ScrollBar'
import { asyncRouterMap, constantRouterMap } from '@/router'

export default {
  data () {
    return {
      router: constantRouterMap.concat(asyncRouterMap)
    }
  },
  components: { SidebarItem, ScrollBar },
  computed: {
    isCollapse () {
      return !this.sidebar.opened
    },
    ...mapGetters([
      'sidebar'
    ])
  },
  created () {
    this.sidebar.opened = false
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
</style>
