 <template>
  <div :class="className"
   :id="id" 
   :style="{height:height,width:width}" >
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
      // 图表标题
      type: String,
      default: ''
    },
    itemColor: {
      type: String,
      default: '#c23531'
    },
    data: {
      // 图表数据，格式为[{国家名：'中国',字段名：值}]
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
      // 文本颜色(和牵引线颜色)：字符串或一个RGB数组
      type: [String, Array],
      default: 'rgba(255, 255, 255, 0.3)'
    },
    backgroundColor: {
      // 背景色，字符串或rgb数组
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
          show: true,
          left: 'center',
          bottom: '5%',
          textStyle: {
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: this.title + ' <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: min * 0.6,
          max: max * 1.4,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: [
          {
            name: this.wo,
            type: 'pie',
            // radius: '55%',
            radius: ['20%', '55%'],
            center: ['50%', '50%'],
            data: values.sort(function (a, b) { return a.value - b.value }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: this.getColor(this.textColor)
                },
                formatter: function (param) {
                  var params = param.name
                  var newParamsName = ''// 最终拼接成的字符串
                  var paramsNameNumber = params.length// 实际标签的个数
                  var provideNumber = 13// 每行能显示的字的个数
                  var rowNumber = Math.ceil(paramsNameNumber / provideNumber)// 换行的话，需要显示几行，向上取整
                  /**
                  * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                  */
                  // 条件等同于rowNumber>1
                  if (paramsNameNumber > provideNumber) {
                  /** 循环每一行,p表示行 */
                    for (var p = 0; p < rowNumber; p++) {
                      var tempStr = ''// 表示每一次截取的字符串
                      var start = p * provideNumber// 开始截取的位置
                      var end = start + provideNumber// 结束截取的位置
                      // 此处特殊处理最后一行的索引值
                      if (p === rowNumber - 1) {
                      // 最后一次不换行
                        tempStr = params.substring(start, paramsNameNumber)
                      } else {
                      // 每一次拼接字符串并换行
                        tempStr = params.substring(start, end) + '\n'
                      }
                      newParamsName += tempStr// 最终拼成的字符串
                    }
                  } else {
                  // 将旧标签的值赋给新标签
                    newParamsName = params
                  }
                  // 将最终的字符串返回
                  return newParamsName
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: this.getColor(this.textColor)
                },
                smooth: 0.2,
                length: 10,
                length2: 10
              }
            },
            itemStyle: {
              normal: {
                color: this.itemColor,
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
      var that = this
      this.chart.on('click', function (params) {
        // 发送点击消息
        this.chart.clear()
        that.$emit('click-pie', params.name)
      })
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
    data (newData, oldData) {
      this.initChart()
    },
    itemColor () {
      this.initChart()
    },
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
