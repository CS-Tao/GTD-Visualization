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
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    t: {
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
              listName: 'type1',
              value: [1, 2, 3, 4, 5]
            },
            {
              listName: 'type2',
              value: [2, 3, 1, 5, 6]
            },
            {
              listName: 'type3',
              value: [5, 3, 2, 1, 4]
            },
            {
              listName: 'type4',
              value: [5, 1, 4, 2, 3]
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
      // 背景色，字符串或rgb数组
      type: [String, Array],
      default: '#000000'
    },
    indicatorName: {
      // 传入的data数据中，x列的名字
      type: [String],
      default: 'listName'
    },
    valueName: {
      // 传入的data数据中，y列的名字
      type: [String],
      default: 'value'
    },
    showLegend: {
      // 是否显示图例
      type: Boolean,
      default: true
    },
    begin: {
      // 开始年份
      type: Number,
      default: 1970
    },
    end: {
      // 终止年份
      type: Number,
      default: 2016
    },
    seriesName: {
      type: [String, Number],
      default: 0
    },
    selectName: {
      type: String,
      default: ''
    }
  },
  data () {
    var t = null
    if (this.t === 'sumProp') { t = 'SUM of Prop' }
    if (this.t === 'count') { t = 'SUM of Count' }
    if (this.t === 'sumKill') { t = 'SUM of Kill' }
    return {
      chart: null,
      title: t
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
      var that = this
      this.chart.setOption({
        animationDuration: 5000,
        backgroundColor: this.getColor(this.backgroundColor),
        title: {
          text: this.title,
          top: '8%',
          left: '8%',
          textStyle: {
            color: 'Orange'
          }
        },
        legend: {
          data: this.title,
          textStyle: {
            color: this.getColor(this.textColor)
          },
          show: this.showLegend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          formatter: this.title + ' <br/>{b} : {c}',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.getXvalue(),
          textStyle: {
            color: this.getColor(this.textColor)
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: 'rgba(128,128,128,0.1)'
            }
          }
        },
        series: this.setSeriesByData()
      })
      this.chart.on('click', function (params) {
        // 发送点击消息
        that.$emit('click-eployline', params.name)
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
    setSeriesByData () {
      var res = []
      for (var i = 0; i < this.data.length; i++) {
        res.push({
          name: this.data[i][this.indicatorName],
          type: 'line',
          data: this.data[i][this.valueName]
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
    getXvalue () {
      if (this.begin >= this.end) { return [] }
      var res = []
      for (var i = this.begin; i < this.end; i++) {
        res.push(i.toString())
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
