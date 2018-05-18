<template>
  <div class='general-analysis-container'>
    <rotate-selector class='rotate-selecter' v-on:change-year='getYear'></rotate-selector>
    <div class='chart-views'>
      <region-statistics-bar id='region-bar-chat-view' class='region-bar-chat-view' :obj='BarJson'></region-statistics-bar>
      <div class="pie-charts-view">
        <year3-model-pie id='attack-pie-chart-view' model='attack' class='attack-pie-chart-view' :obj='PieJson'></year3-model-pie>
        <year3-model-pie id='target-pie-chart-view' model='target' class='target-pie-chart-view' :obj='PieJson'></year3-model-pie>
        <year3-model-pie id='weapon-pie-chart-view' model='weapon' class='weapon-pie-chart-view' :obj='PieJson'></year3-model-pie>
      </div>
    </div>
  </div>
</template>

<script>
import RotateSelector from '@/components/RotateSelector'
import year3ModelPie from '@/components/Charts/year3ModelPie'
import regionStatisticsBar from '@/components/Charts/regionStatisticsBar'
import { getPie, getBar } from '@/api/generalAnalysisApi'
export default {
  name: 'GeneralAnalysis',
  data () {
    return {
      PieJson: {},
      BarJson: []
    }
  },
  methods: {
    getYear (year) {
      getPie({
        format: 'json',
        year: year
      })
        .then(response => {
          this.PieJson = response.data
        })
        .catch(() => {
        })
      getBar({
        format: 'json',
        year: year
      })
        .then(response => {
          this.BarJson = response.data
        })
        .catch(() => {
        })
    }
  },
  components: {
    RotateSelector,
    year3ModelPie,
    regionStatisticsBar
  },
  mounted () {
    this.$changeLayout()
    getPie({
      format: 'json',
      year: 1970
    })
      .then(response => {
        this.PieJson = response.data
      })
      .catch(() => {
      })
    getBar({
      format: 'json',
      year: 1970
    })
      .then(response => {
        this.BarJson = response.data
      })
      .catch(() => {
      })
  }
}
</script>

<style lang="scss" scoped>
.general-analysis-container {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-flow: row;
  .rotate-selecter {
    width: 10%;
    height: 100%;
  }
  .chart-views {
    height: 100%;
    width: 90%;
    display: flex;
    flex-flow: column;
    align-items: stretch;
    .region-bar-chat-view {
      flex: 1;
    }
    .pie-charts-view {
      flex: 1;
      display: flex;
      flex-flow: row;
      align-items: stretch;
      .attack-pie-chart-view {
        flex: 1;
      }
      .target-pie-chart-view {
        flex: 1;
      }
      .weapon-pie-chart-view {
        flex: 1;
      }
    }
  }
}
</style>
