<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    countryName: {
      type: Array,
      default () {
        return ['Saturday']
      }

    },
    data: {
      type: Array,
      default () {
        return [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 1, 1, 3, 4, 6, 4, 4, 3, 3, 2, 5]
      }
    },
    time: {
      type: Array,
      default () {
        return ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
          '7a', '8a', '9a', '10a', '11a',
          '12p', '1p', '2p', '3p', '4p', '5p',
          '6p', '7p', '8p', '9p', '10p', '11p']
      }
    }

  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    data (newData, oldData) {
      this.initChart()
    }
    // countryName () {
    //   this.initChart()
    // },
    // time () {
    //   this.initChart()
    // }
  },
  methods: {
    initChart () {
      this.chart = echarts.init(document.getElementById(this.id))

      var hours = this.time
      var days = this.countryName
      var len = this.countryName.length

      var data = this.data
      var option = {
        tooltip: {
          position: 'top'
        },
        backgroundColor: 'rgba(128,0,0,0)',
        title: [],
        singleAxis: [],
        series: []
      }

      echarts.util.each(days, function (day, idx) {
        option.title.push({
          textBaseline: 'middle',
          top: (idx + 0.5) * 100 / len + '%',
          text: day
        })
        option.singleAxis.push({
          left: 150,
          type: 'category',
          boundaryGap: false,
          data: hours,
          top: (idx * 100 / len + 5) + '%',
          height: (100 / len - 10) + '%',
          axisLabel: {
            interval: 2,
            inside: true
          }
        })
        option.series.push({
          singleAxisIndex: idx,
          coordinateSystem: 'singleAxis',
          type: 'scatter',
          data: [],
          symbolSize: function (dataItem) {
            return dataItem[1] * 4
          }
        })
      })

      echarts.util.each(data, function (dataItem, idx) {
        option.series[0].data.push([idx, dataItem])
      })
      this.chart.setOption(
        option)
      this.chart.on('click', function (params) {
        // 发送点击消息
        this.$emit('click-keyboard', params.name)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-wrapper {
  background: #fff;
  padding: 16px 16px;
  margin-bottom: 32px;
  width: 100%;
  height: 85vh;
}
</style>
