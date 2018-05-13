 <template>
  <div :class="className"
   :id="id" 
   :style="{height:height,width:width}" 
   :title="title" :data="data" 
   :textcolor="textColor" 
   :areacolor="areaColor"
   :backgroundColor="backgroundColor"
   :indicatorName="indicatorName"
   :value="valueName"
   :radius="radius">
  </div>
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
      type: Array,
      default: function () {
        var res =
          [
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
              value: 1
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

        return res
      }
    },
    textColor: {
      type: [String, Array],
      default: function () {
        return [114, 172, 209]
      }
    },
    areaColor: {
      type: [String, Array],
      default: function () {
        return [114, 172, 209]
      }
    },
    backgroundColor: {
      type: [String, Array],
      default: '#2c343c'
    },
    indicatorName: {
      type: [String],
      default: 'indicator'
    },
    valueName: {
      type: [String],
      default: 'value'
    },
    radius: {
      type: Number,
      default: 120
    },
    seriesName: {
      type: String,
      default: ''
    },
    selectName: {
      type: String,
      default: ''
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
      var c = this.getValue(this.data)
      console.log(c[0])
      this.chart.setOption({
        backgroundColor: this.getColor(this.backgroundColor),
        title: {
          text: this.title,
          x: 'left',
          y: 'top',
          textAlign: 'left'
        },
        radar: [
          {
            indicator: this.getIndicator(this.data),
            center: ['50%', '50%'],
            radius: this.radius,
            startAngle: 90,
            splitNumber: 4,
            shape: 'rect',
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
      for (var i = 0; i < data.length; i++) {
        res.push({
          text: data[i][this.indicatorName]
        })
      }
      return res
    },
    getValue (data) {
      var res = []
      for (var i = 0; i < data.length; i++) {
        res.push(data[i][this.valueName]
        )
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
    },
    highlignt (name) {
      this.chart.dispatchAction({
        type: 'highlight',
        seriesIndex: name.seriesName,
        name: name.selectName
      })
    },
    downplay (name) {
      this.chart.dispatchAction({
        type: 'downplay',
        seriesIndex: name.seriesName,
        name: name.selectName
      })
    }
  },
  watch: {
    selectName (newSelect, oldSelect) {
      this.highlignt({selectName: newSelect, seriesName: this.seriesName})
      this.downplay({selectName: oldSelect, seriesName: this.seriesName})
      this.chart.dispatchAction({
        type: 'showTip',
        seriesIndex: this.seriesName,
        name: newSelect
      })
    },
    seriesName (newSeries, oldSeries) {
      this.highlignt({selectName: this.selectName, seriesName: newSeries})
      this.downplay({selectName: this.selectName, seriesName: oldSeries})
      this.chart.dispatchAction({
        type: 'showTip',
        seriesIndex: newSeries,
        name: this.selectName
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
