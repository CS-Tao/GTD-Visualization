<template>
  <div id="TrendChartView" height="100%" width="100%">
      <globeTrendLine id='count'
      height='100%'
      width='100%'
      model="count">
      </globeTrendLine>
      <globeTrendLine id='sumKill'
      height='100%'
      width='100%'
      model='sumKill'>
      </globeTrendLine>
      <globeTrendLine id='sumProp'
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
