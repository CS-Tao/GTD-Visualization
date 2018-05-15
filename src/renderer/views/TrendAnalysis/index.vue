<template>
  <div class="">
      <globeTrendLine
      id='count'
      class="chart-wrap"
      height='100%'
      width='100%'
      model="count">
      </globeTrendLine>
      <globeTrendLine
      id='sumKill'
      class="chart-wrap"
      height='100%'
      width='100%'
      model='sumKill'>
      </globeTrendLine>
      <globeTrendLine
      id='sumProp'
      class="chart-wrap"
      height='100%'
      width='100%'
      model='sumProp'>
      </globeTrendLine>
  </div>
</template>

<script>
import globeTrendLine from '@/components/Charts/globeTrendLine'
import Mixin from '../Mixin'

export default {
  components: {
    globeTrendLine
  },
  mixins: [Mixin],
  created () {
    this.changeLayout()
  }
}
</script>

<style lang="scss" scoped>
.trend-analysis {
  width: 100%;
  height: 100%;
  .chart-wrap {
    display: block;
  }
}
</style>
