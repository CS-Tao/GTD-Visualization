<template>
  <el-breadcrumb class="app-breadcrumb" separator=">">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if='item.meta.title'>
        <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item 
      v-for="(text,index) in timeAnalysisMode.display" 
      :key="index" 
      v-if="timeAnalysisMode.enable">
        <span class="redirect" v-bind:id="modeList[index+1]" v-on:click="clickListener">{{text}}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  created () {
    this.getBreadcrumb()
  },
  data () {
    return {
      levelList: null,
      modeList: ['gloabl', 'region', 'country', 'detail']
    }
  },
  computed: {
    timeAnalysisMode () {
      return this.$store.state.app.timeAnalysisMode
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      console.log(matched)
      // const first = matched[0]
      // if (first && first.name !== 'dashboard') {
      //   matched = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(matched) // eslint-disable-line
      // }
      this.levelList = matched
    },
    clickListener (e) {
      const newMode = e.target.id
      let display = []
      if (newMode === 'region') {
        display = [this.timeAnalysisMode.display[0]]
      } else if (newMode === 'country') {
        display = [this.timeAnalysisMode.display[0], this.timeAnalysisMode.display[1]]
      }
      this.$store.dispatch('changeTimeAnalysisMode', {mode: e.target.id, display: display, enable: true})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/variables.scss';
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 7vh;
    margin-left: 10px;
    .no-redirect {
      color: $yo-1;
      cursor: text;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 1.5rem;
      line-height: 7vh;
    }
    .redirect {
      color: $yo-2;
      cursor: pointer;
      font-size: 18px;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 7.5vh!important;
    }
  }
</style>
