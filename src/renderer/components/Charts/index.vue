<template>
  <div class="chart-container">
    <div class='chart-container'>
      <div class="chart-wrapper">
        <keyboard id="echarts-keyboard" 
        height='100%' 
        width='100%'>
        </keyboard>
        <country3ModelRadar id="country-radar">
        </country3ModelRadar>
        <regionCountBar id="region-bar">
        </regionCountBar>
        <regionStatisticsBar id="statistic-bar">
        </regionStatisticsBar>
        <globeTrendLine id="trend-line"
        height="100%"
        width="100%">
        </globeTrendLine>
        <year3ModelPie id="country-pie"
        >
        </year3ModelPie>
      </div>
    </div>
  </div>
</template>

<script>
import keyboard from './keyboard'
import country3ModelRadar from './country3ModelRadar'
import regionCountBar from './regionCountBar'
import regionStatisticsBar from './regionStatisticsBar'
import globeTrendLine from './globeTrendLine'
import year3ModelPie from './year3ModelPie'

export default {
  name: 'Echarts',
  components: { keyboard, country3ModelRadar, regionCountBar, regionStatisticsBar, globeTrendLine, year3ModelPie }

}
</script>

<style lang="scss" scoped>
.chart-container {
  padding: 15px 32px 25px 32px;
  background-color: rgb(240, 242, 245);
  .select-wrapper {
    margin-bottom: 0px;
    margin-right: 0px;
    width: 100%;
    .tag-wraper {
      display: flex;
      display: -webkit-flex;
      align-items: center;
    }
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px;
    margin-bottom: 32px;
    width: 100%;
    height: 85vh;
  }
}
</style>

