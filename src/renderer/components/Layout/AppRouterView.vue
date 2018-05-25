<template>
  <div class="app-router-view flex-row">
    <router-view class="flex-item-fill"></router-view>
  </div>
</template>

<script>
import ScrollBar from './SidebarComponents/ScrollBar'

export default {
  data () {
    return {}
  },
  components: { ScrollBar }
}
</script>

<style lang="scss" scoped>
.app-router-view {
  width: 100%;
  height: 100%;
}
</style>

