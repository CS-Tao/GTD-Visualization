<template>
  <bar :id='id'
        height="100%"
        width="100%"
        :data="params"
        :selectName="selectName"
        :vertical="false"
        @click-bar="sendClick"
        @move-bar="sendMove">
  </bar>
</template>

<script>
import bar from './bar'

export default {
  name: 'regionStatisticsBar',
  components: {bar},
  props: {
    id: {
      type: String,
      default: ''
    },
    obj: {
      // 接受到的数据
      type: Array,
      default: function () {
        return [
          {
            'region': 1,
            'sumKill': 3992,
            'regionName': 'North America',
            'count': 2589,
            'sumWound': 17325,
            'sumProp': 944434630.2
          },
          {
            'region': 2,
            'sumKill': 42788,
            'regionName': 'Central America & Caribbean',
            'count': 18850,
            'sumWound': 19238,
            'sumProp': 730808901.64
          },
          {
            'region': 3,
            'sumKill': 14014,
            'regionName': 'South America',
            'count': 9971,
            'sumWound': 5858,
            'sumProp': 863871128.0
          },
          {
            'region': 4,
            'sumKill': 1141,
            'regionName': 'East Asia',
            'count': 792,
            'sumWound': 9032,
            'sumProp': 11296000.0
          },
          {
            'region': 5,
            'sumKill': 10688,
            'regionName': 'Southeast Asia',
            'count': 9123,
            'sumWound': 18727,
            'sumProp': 65220355.17
          },
          {
            'region': 6,
            'sumKill': 32354,
            'regionName': 'South Asia',
            'count': 15200,
            'sumWound': 48847,
            'sumProp': 451819794.98
          },
          {
            'region': 8,
            'sumKill': 5398,
            'regionName': 'Western Europe',
            'count': 12852,
            'sumWound': 14609,
            'sumProp': 4382879692.37
          },
          {
            'region': 9,
            'sumKill': 26125,
            'regionName': 'Eastern Europe',
            'count': 12654,
            'sumWound': 32482,
            'sumProp': 339563563.45
          },
          {
            'region': 10,
            'sumKill': 157776,
            'regionName': 'Middle East & North Africa',
            'count': 61835,
            'sumWound': 249434,
            'sumProp': 135057608.47
          },
          {
            'region': 11,
            'sumKill': 62841,
            'regionName': 'Sub-Saharan Africa',
            'count': 13674,
            'sumWound': 41395,
            'sumProp': 58384417.3598799
          },
          {
            'region': 12,
            'sumKill': 108,
            'regionName': 'Australasia & Oceania',
            'count': 213,
            'sumWound': 194,
            'sumProp': 1836800.0
          }
        ]
      }
    },
    selectName: {
      // 外部传入，用于指定高亮的region名
      type: String,
      default: ''
    }
  },
  data () {
    return {
      params: {}
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {

    initChart () {
      var param = {}
      var sumKill = []
      var sumWound = []
      var sumProp = []
      for (var i = 0; i < this.obj.length; i++) {
        var dicKill = {}
        dicKill.indicator = this.obj[i].regionName
        dicKill.value = this.obj[i].sumKill
        sumKill.push(dicKill)
        var dicWound = {}
        dicWound.indicator = this.obj[i].regionName
        dicWound.value = this.obj[i].sumWound
        sumWound.push(dicWound)
        var dicProp = {}
        dicProp.indicator = this.obj[i].regionName
        dicProp.value = this.obj[i].sumProp
        sumProp.push(dicProp)
      }
      param.sumProp = sumProp
      param.sumWound = sumWound
      param.sumKill = sumKill
      this.params = param
    },
    sendClick (param) {
      this.$emit('click-bar', param)
    },
    sendMove (param) {
      this.$emit('move-bar', param)
    }
  }
}
</script>

