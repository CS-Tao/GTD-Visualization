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
  // border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  opacity: $Opacity;
  background: linear-gradient(top left, $gb-3, $gb-2);
  background: -webkit-linear-gradient(top left, $gb-3, $gb-2);
  background: -moz-linear-gradient(top left, $gb-3, $gb-2);
  background: -o-linear-gradient(top left, $gb-3, $gb-2);
  .hamburger-container {
    line-height: 58px;
    height: 7vh;
    float: left;
    padding: 0 10px;
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
