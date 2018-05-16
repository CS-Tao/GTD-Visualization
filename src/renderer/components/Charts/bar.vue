 <template>
  <div :class="className"
   :id="id" 
   :style="{height:height,width:width}">
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
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    strack: {
      type: Boolean,
      default: false
    },
    title: {
      // 图表标题
      type: String,
      default: ''
    },
    barBorderRadius: {
      type: Number,
      default: 10
    },
    vertical: {
      // bar是否竖直排列：布尔型
      type: Boolean,
      default: true
    },
    xPosition: {
      type: String,
      default: 'bottom'
    },
    splitLine: {
      type: Boolean,
      default: false
    },
    data: {
      // 图表数据，格式为{类型：[{国家名：'中国',字段名：值}]}
      type: Object,
      default: function () {
        var res = {
          att: [
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
          ],
          btt: [
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
              value: 4
            },
            {
              indicator: 'type4',
              value: 5
            },
            {
              indicator: 'type5',
              value: 4
            }
          ]
        }
        return res
      }
    },
    textColor: {
      // 文本颜色：字符串或一个RGB数组
      type: [String, Array],
      default: '#00A383'
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
      chart: null,
      highligntName: ''
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
        grid: {
          left: '3%',
          right: this.vertical ? '-15%' : '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(0,0,0,0)'
            }
          }
        },

        xAxis: [{
          position: this.xPosition,
          inverse: this.vertical,
          axisLabel: {
            interval: 0,
            rotate: 30,
            textStyle: {
              color: this.getColor(this.textColor)
            }
            // align: 'center'
          },
          splitLine: {
            show: this.splitLine,
            lineStyle: {
              color: '#08263f'
            }
          },
          type: this.vertical === true ? 'value' : 'category',
          show: true,
          textStyle: {
            color: this.getColor(this.textColor)
          },
          data: this.vertical === true ? [] : this.getIndicator(this.data)
        }],
        yAxis: [ {
          position: this.vertical ? 'right' : 'left',
          data: this.vertical === true ? this.getIndicator(this.data) : [],
          type: this.vertical === true ? 'category' : 'value',
          axisLine: {
            show: false,
            lineStyle: this.lineStyle
          },
          axisLabel: {
            inside: this.vertical,
            textStyle: {
              color: this.getColor(this.textColor)
            }
            // align: 'right'
          },
          splitLine: {
            show: this.splitLine,
            lineStyle: {
              color: '#08263f'
            }
          },
          axisTick: {
            show: false
          }
        },
        {
          position: 'right',
          data: this.vertical === true ? this.getIndicator(this.data) : [],
          type: this.vertical === true ? 'category' : 'value',
          show: !this.vertical,
          axisLine: {
            show: false,
            lineStyle: this.lineStyle
          },
          axisLabel: {
            textStyle: {
              color: this.getColor(this.textColor)
            }
          },
          axisTick: {
            show: false
          }
        } ],
        series: this.getSeries(this.data),
        animationEasing: 'elasticOut',
        animationEasingUpdate: 'elasticOut',
        animationDelay (idx) {
          return idx * 20
        },
        animationDelayUpdate (idx) {
          return idx * 20
        }
      })
      var that = this
      this.chart.on('click', function (params) {
        // 发送点击消息
        that.$emit('click-bar', params.name)
      })
      this.chart.on('mouseover', function (params) {
        that.$emit('over-bar', params.name)
      })
      this.chart.on('mouseout', function (params) {
        that.$emit('out-bar', params.name)
      })
    },
    getIndicator (data) {
      var list = []
      for (var key in data) {
        list = data[key]
        break
      }
      var res = []
      for (var i = 0; i < list.length; i++) {
        res.push(
          list[i][this.indicatorName]
        )
      }
      return res
    },
    getValue (data) {
      var res = []
      for (var i = 0; i < data.length; i++) {
        res.push(this.vertical ? data[i][this.valueName] : data[i][this.valueName]
        )
      }
      return res
    },
    getSeries (data) {
      var res = []
      for (var key in data) {
        var dic = {}
        if (this.strack) {
          dic.stack = 'one'
        }
        dic.name = key
        dic.type = 'bar'
        dic.data = this.getValue(data[key])
        dic.yAxisIndex = key === 'sumProp' ? 0 : 1
        dic.z = 0
        dic.itemStyle = {
          normal: {
            barBorderRadius: this.barBorderRadius,
            color: this.vertical ? '#0D58A6' : ''
          },
          emphasis: {
            color: this.vertical ? '#FF9900' : ''
          }
        }
        res.push(dic)
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
    data (newData, oldData) {
      this.initChart()
    },
    selectName (newSelect, oldSelect) {
      this.highlignt(newSelect)
      this.downplay(oldSelect)
      this.highligntName = newSelect
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
