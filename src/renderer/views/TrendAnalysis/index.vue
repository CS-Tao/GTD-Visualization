<template>
  <div class="trend-analysis">
    <globeTrendLine
    id='sumCunt'
    class="chart-wrap"
    height='100%'
    width='100%'
    model="count"
    :obj="obj">
    </globeTrendLine>
    <globeTrendLine
    id='sumKill'
    class="chart-wrap"
    height='100%'
    width='100%'
    model='sumKill'
    :obj="obj">
    </globeTrendLine>
    <globeTrendLine
    id='sumProp'
    class="chart-wrap"
    height='100%'
    width='100%'
    model='sumProp'
    :obj="obj">
    </globeTrendLine>
  </div>
</template>

<script>
import globeTrendLine from '@/components/Charts/globeTrendLine'
import { getTrend } from '@/api/trendAnalysisApi'

export default {
  components: {
    globeTrendLine
  },
  data: function () {
    return {
      obj: []
    }
  },
  mounted () {
    this.$changeLayout()
    if (this.$route.name) {
      this.$store.dispatch('addVisitedViews', this.$route)
    }
    getTrend({
      format: 'json'
    })
      .then(response => {
        this.obj = response.data
      })
      .catch(() => {
      })
  }
}
</script>

<style lang="scss" scoped>
.trend-analysis {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  .chart-wrap {
    display: block;
    flex: 1;
  }
}
</style>
