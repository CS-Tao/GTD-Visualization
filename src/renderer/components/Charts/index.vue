<template>
  <div class="chart-container">
    <div class='chart-container'>
      <div class="chart-wrapper">
        <keyboard id="echarts-keyboard" 
        height='100%' 
        width='100%'>
        </keyboard>
        <radar id="echarts-rader"
        title="radar"
        height='100%'
        width=100%>
        </radar>
        <bar id="echarts-bar"
        height="100%"
        width="100%">
        </bar>
        <e-polyline id="echarts-line"
        height="100%"
        width="100%"
        :begin="1"
        :end="6">
        </e-polyline>
        <pie id="echart-pie"
        height="100%"
        width="100%"
        >
        </pie>
      </div>
    </div>
  </div>
</template>

<script>
import keyboard from './keyboard'
import radar from './radar'
import bar from './bar'
import ePolyline from './ePolyline'
import pie from './pie'

export default {
  name: 'Echarts',
  components: { keyboard, radar, bar, ePolyline, pie }

}
pie.selecName = ['type2']
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

