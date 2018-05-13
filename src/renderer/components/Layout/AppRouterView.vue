<template>
  <div class="app-router-view" style="min-height: 100%">
    <scroll-bar>
      <router-view></router-view>
    </scroll-bar>
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

