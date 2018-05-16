<template>
<div class='general-analysis-container'>
    <rotate-selector class='rotate-selecter' v-on:change-year='getYear'></rotate-selector>
    <div class='chart-views'>
        <region-statistics-bar id='region-bar-chat-view' class='region-bar-chat-view' :obj='BarJson'></region-statistics-bar>
        <year3-model-pie id='attack-pie-chart-view' model='attack' class='attack-pie-chart-view' :obj='PieJson'></year3-model-pie>
        <year3-model-pie id='target-pie-chart-view' model='target' class='target-pie-chart-view' :obj='PieJson'></year3-model-pie>
        <year3-model-pie id='weapon-pie-chart-view' model='weapon' class='weapon-pie-chart-view' :obj='PieJson'></year3-model-pie>
    </div>
</div>
</template> 

<script>
import Mixin from '../Mixin'
import RotateSelector from '@/components/RotateSelector'
import year3ModelPie from '@/components/charts/year3ModelPie'
import regionStatisticsBar from '@/components/charts/regionStatisticsBar'
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
      console.log(year)
      getPie({
        format: 'json',
        year: year
      }).then(response => {
        this.PieJson = response.data
      })
      getBar({
        format: 'json',
        year: year
      }).then(response => {
        this.BarJson = response.data
      })
    }
  },
  components: {
    RotateSelector,
    year3ModelPie,
    regionStatisticsBar
  },
  mixins: [Mixin],
  created () {
    this.changeLayout()
    getPie({
      format: 'json',
      year: 1970
    }).then(response => {
      this.PieJson = response.data
    })
    getBar({
      format: 'json',
      year: 1970
    }).then(response => {
      this.BarJson = response.data
    })
  }
}
</script>

<style lang="scss" scoped>
.general-analysis-container{
    height: 100%;
    width: 100%;
    display: flex;
    .chart-views{
        height: 100%!important;
        width: 75%!important;
        display: flex;
        flex-wrap: wrap;
        .region-bar-chat-view{
            background-color: blue;
            height: 50%!important;
            width: 100%!important;
    
        }
        .attack-pie-chart-view{
            // background-color: yellow;
            height: 50%!important;
            width: 33%!important;
        }
        .target-pie-chart-view{
            // background-color: orange;
            height: 50%!important;
            width: 33%!important;
        }
        .weapon-pie-chart-view{
            // background-color: green;
            height: 50%!important;
            width: 34%!important;
        }
    }
    .rotate-selecter{
    // background-color: red;
    height: 100%;
    width: 25%;
    }
}
</style>
