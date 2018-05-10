 <template>
  <div :class="className" :id="id" :style="{height:height,width:width}" :title="title" :data="data" :textcolor="textColor" :areacolor="areaColor"></div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chartRadar'
    },
    id: {
      type: String,
      default: 'chartRadar'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: function () {
        var res = {
          data: [
            {
              indicator: 'type1',
              value: 0
            },
            {
              indicator: 'type2',
              value: 0
            },
            {
              indicator: 'type3',
              value: 0
            },
            {
              indicator: 'type4',
              value: 0
            },
            {
              indicator: 'type5',
              value: 0
            }
          ]
        }
        return res
      }
    },
    textColor: {
      type: [String, Array],
      default: [114, 172, 209]
    },
    areaColor: {
      type: [String, Array],
      default: [114, 172, 209]
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
  methods: {
    initChart () {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        title: {
          text: this.title,
          x: 'left',
          y: 'top',
          textAlign: 'left'
        },
        legend: {
          data: ['图一']
        },
        radar: [
          {
            indicator: this.getIndicator(this.data),
            center: ['25%', '50%'],
            radius: 120,
            startAngle: 90,
            splitNumber: 4,
            shape: 'circle',
            name: {
              formatter: '【{value}】',
              textStyle: {
                color: this.getColor(this.textColor)
              }
            },
            splitArea: {
              areaStyle: {
                color: this.getColorList(this.areaColor),
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowBlur: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.5)'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.5)'
              }
            }
          }
        ],
        series: [
          {
            name: '雷达图',
            type: 'radar',
            itemStyle: {
              emphasis: {
                // color: 各异,
                lineStyle: {
                  width: 4
                }
              }
            },
            data: [
              {
                value: this.getValue(this.data),
                name: '图一',
                symbol: 'rect',
                symbolSize: 5,
                lineStyle: {
                  normal: {
                    type: 'dashed'
                  }
                }
              }
            ]
          }
        ]
      })
    },
    getIndicator (data) {
      var res = []
      for (var i = 0; i < data.data.length; i++) {
        res.push({
          text: data.data[i].indicator
        })
      }
      return res
    },
    getValue (data) {
      var res = []
      for (var i = 0; i < data.data.length; i++) {
        res.push({
          text: data.data[i].value
        })
      }
      return res
    },
    getColor (color) {
      if (typeof color === 'string') {
        return color
      } else if (typeof color === 'object') {
        var res =
          'rgba(' +
          color[0].toString() +
          ',' +
          color[1].toString() +
          ',' +
          color[2].toString() +
          ', 1)'
        return res
      } else {
        return ''
      }
    },
    getColorList (color) {
      if (typeof color === 'string') {
        return color
      } else if (typeof color === 'object') {
        var res = []
        res.push(
          'rgba(' +
            color[0].toString() +
            ',' +
            color[1].toString() +
            ',' +
            color[2].toString() +
            ', 1)'
        )
        res.push(
          'rgba(' +
            color[0].toString() +
            ',' +
            color[1].toString() +
            ',' +
            color[2].toString() +
            ', 0.8)'
        )
        res.push(
          'rgba(' +
            color[0].toString() +
            ',' +
            color[1].toString() +
            ',' +
            color[2].toString() +
            ', 0.6)'
        )
        res.push(
          'rgba(' +
            color[0].toString() +
            ',' +
            color[1].toString() +
            ',' +
            color[2].toString() +
            ', 0.4)'
        )
        res.push(
          'rgba(' +
            color[0].toString() +
            ',' +
            color[1].toString() +
            ',' +
            color[2].toString() +
            ', 0.2)'
        )
        return res
      } else {
        return ''
      }
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
