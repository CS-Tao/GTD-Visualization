<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import Screenfull from '@/components/Screenfull'

export default {
  name: 'AppHeader',
  components: {
    Hamburger,
    Breadcrumb,
    Screenfull
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/variables.scss';
.navbar {
  height: 7vh;
  line-height: 7vh;
  border-radius: 0px !important;
  display: block;
  z-index: 401;
  overflow: hidden;
  opacity: $Opacity;
  background-color: $gb-2;
  box-shadow: 0 0 3px $gb-4;
  .hamburger-container {
    line-height: 8.12vh;
    height: 7vh;
    float: left;
    padding: 0 1.4vh;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
      padding: 0 10px;
    }
    .international{
      vertical-align: top;
    }
  }
}
</style>
