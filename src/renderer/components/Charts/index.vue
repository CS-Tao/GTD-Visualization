<template>
  <div class="chart-container">
    <div class='chart-container'>
      <div class="chart-wrapper">
        <keyboard id="echarts-keyboard" 
        height='100%' 
        width='100%'>
        </keyboard>
      </div>
    </div>
  </div>
</template>

<script>
import keyboard from './keyboard'

export default {
  name: 'Echarts',
  components: { keyboard }
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

