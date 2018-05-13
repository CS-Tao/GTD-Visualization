 <template>
  <div :class="className"
   :id="id" 
   :style="{height:height,width:width}" 
   :title="title" :data="data" 
   :textcolor="textColor" 
   :areacolor="areaColor"
   :backgroundColor="backgroundColor"
   :indicatorName="indicatorName"
   :value="valueName">
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
              value: 2
            },
            {
              indicator: 'type2',
              value: 3
            },
            {
              indicator: 'type3',
              value: 1
            },
            {
              indicator: 'type4',
              value: 5
            },
            {
              indicator: 'type5',
              value: 1
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
    selectName: {
      type: [String, Array],
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
      var a = this.setData()
      var values = a.res
      var max = a.max
      var min = a.min

      this.chart.setOption({
        backgroundColor: this.getColor(this.backgroundColor),

        title: {
          text: this.title,
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: min * 0.6,
          max: max * 1.4,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: this.wo,
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: values.sort(function (a, b) { return a.value - b.value }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200
            }
          }
        ]
      })
    },
    highlignt (name) {
      this.chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        name: 3
      })
    },
    downplay (name) {
      this.chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        name: name
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
    setData () {
      var res = []
      var max = 0
      var min = 160000
      for (var i = 0; i < this.data.length; i++) {
        res.push({
          value: this.data[i][this.valueName],
          name: this.data[i][this.indicatorName]
        })
        if (this.data[i][this.valueName] > max) { max = this.data[i][this.valueName] }
        if (this.data[i][this.valueName] < min) { min = this.data[i][this.valueName] }
      }
      return {'res': res, 'max': max, 'min': min}
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
  },
  watch: {
    selectName (newSelect, oldSelect) {
      this.highlignt(newSelect)
      this.downplay(oldSelect)
      this.chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        name: newSelect
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
