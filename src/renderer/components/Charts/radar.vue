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
    lineColor: {
      type: String,
      default: ''
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
              indicator: 'type1大幅高开是个卡行距过大建行没事v就哈v才看见，HloAH',
              value: 2
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
      // 文本颜色：字符串或一个RGB数组
      type: [String, Array],
      default: function () {
        return 'rgb(253, 227, 80)'
      }
    },
    areaColor: {
      // 雷达图区域颜色：从中心到四周透明度逐渐增大
      type: [String, Array],
      default: function () {
        return 'rgba(114, 172, 209,0.3)'
      }
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
    radius: {
      // 半径
      type: Number,
      default: 90
    },
    selectName: {
      // 选中的数据名称
      // 这项不是来自父类的参数
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

      this.chart.setOption({
        backgroundColor: this.getColor(this.backgroundColor),
        title: {
          text: this.title,
          textStyle: {
            color: 'Orange'
          },
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
              formatter: function (params) {
                var newParamsName = ''// 最终拼接成的字符串
                var paramsNameNumber = params.length// 实际标签的个数
                var provideNumber = 20// 每行能显示的字的个数
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
              },
              textStyle: {
                color: this.getColor(this.textColor)
              }
            },
            splitArea: {
              areaStyle: {
                color: ['rgba(253, 227, 80,0.3)', 'rgba(253, 227, 80,0.3)'],
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowBlur: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(253, 227, 80,0.5)'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(253, 227, 80,0.5)'
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
              },
              normal: {
                lineStyle: {color: 'Orange'},
                areaStyle: {color: 'Orange'},
                itemStyle: {color: 'Orange'}
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
                    type: 'solid'
                  }
                }
              }
            ]
          }
        ]
      })
      var that = this
      this.chart.on('click', function (params) {
        // 发送点击消息
        that.$emit('click-radar', params.name)
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
    data (newData, oldData) {
      this.initChart()
    },
    selectName (newSelect, oldSelect) {
      this.highlignt({selectName: newSelect, seriesName: 0})
      this.downplay({selectName: oldSelect, seriesName: 0})
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
