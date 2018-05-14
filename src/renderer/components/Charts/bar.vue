 <template>
  <div :class="className"
   :id="id" 
   :style="{height:height,width:width}" 
   :title="title" :data="data" 
   :textcolor="textColor" 
   :backgroundColor="backgroundColor"
   :indicatorName="indicatorName"
   :value="valueName"
   :lineStyle="lineStyle">
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
      default: 'chartBar'
    },
    id: {
      type: String,
      default: 'chartBar'
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
      // 图表标题
      type: String,
      default: ''
    },
    data: {
      // 图表数据，格式为[{国家名：'中国',字段名：值}]
      type: Array,
      default: function () {
        var res =
          [
            {
              indicator: 'type1',
              value: 1
            },
            {
              indicator: 'type2',
              value: 2
            },
            {
              indicator: 'type3',
              value: 5
            },
            {
              indicator: 'type4',
              value: 4
            },
            {
              indicator: 'type5',
              value: 3
            }
          ]

        return res
      }
    },
    textColor: {
      // 文本颜色：字符串或一个RGB数组
      type: [String, Array],
      default: '#4a657a'
    },
    backgroundColor: {
      // 背景色
      type: [String, Array],
      default: '#000000'
    },
    indicatorName: {
      // 传入的data数据中，x列的名字
      type: [String],
      default: 'indicator'
    },
    valueName: {
      // 传入的data数据中，y列的名字
      type: [String],
      default: 'value'
    },
    selectName: {
      // 选中的数据名称
      // 这项不是来自父类的参数
      type: String,
      default: ''
    },
    lineStyle: {
      // Y轴样式，详见echarts文档
      type: Object,
      default: function () {
        return {
          color: '#08263f'
        }
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
  methods: {
    initChart () {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        backgroundColor: this.getColor(this.backgroundColor),
        xAxis: [{
          show: true,
          textStyle: {
            color: this.getColor(this.textColor)
          },
          data: this.getIndicator(this.data)
        }, {
          show: false,
          textStyle: {

            color: this.getColor(this.textColor)
          },
          data: this.getIndicator(this.data)
        }],
        visualMap: {
          show: false,
          min: 0,
          max: this.data.length,
          dimension: 0,
          inRange: {
            color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055']
          }
        },
        yAxis: {
          axisLine: {
            show: false,
            lineStyle: this.lineStyle
          },
          axisLabel: {
            textStyle: {
              color: this.getColor(this.textColor)
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#08263f'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          name: 'front',
          type: 'bar',
          data: this.getValue(this.data),
          xAxisIndex: 1,
          z: 3,
          itemStyle: {
            normal: {
              barBorderRadius: 5
            }
          }
        }],
        animationEasing: 'elasticOut',
        animationEasingUpdate: 'elasticOut',
        animationDelay (idx) {
          return idx * 20
        },
        animationDelayUpdate (idx) {
          return idx * 20
        }
      })
      this.chart.on('click', function (params) {
        // 发送点击消息
        this.$emit('click-bar', params.name)
      })
    },
    getIndicator (data) {
      var res = []
      for (var i = 0; i < data.length; i++) {
        res.push(
          data[i][this.indicatorName]
        )
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
        seriesIndex: 0,
        name: name
      })
    },
    downplay (name) {
      this.chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        name: name
      })
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
