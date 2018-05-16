<template>
  <bar :id='id'
        height="100%"
        width="100%"
        :data="params"
        :selectName="selectName"
        :vertical="false"
        :strack="true"
        :barBorderRadius="0"
        @click-bar="sendClick"
        @over-bar="sendOver"
        @out-bar="sendOut">
  </bar>
</template>

<script>
import bar from './bar'

export default {
  name: 'countryStatisticsBar',
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
            'sumWound': 1405,
            'countryName': 'Indonesia',
            'sumProp': 23230000.0,
            'country': 70,
            'count': 465,
            'sumKill': 547
          },
          {
            'sumWound': 657,
            'countryName': 'Cambodia',
            'sumProp': 60000.0,
            'country': 84,
            'count': 182,
            'sumKill': 464
          },
          {
            'sumWound': 63,
            'countryName': 'Laos',
            'sumProp': 0.0,
            'country': 88,
            'count': 23,
            'sumKill': 24
          },
          {
            'sumWound': 1408,
            'countryName': 'Myanmar',
            'sumProp': 5725694.0,
            'country': 104,
            'count': 372,
            'sumKill': 753
          },
          {
            'sumWound': 316,
            'countryName': 'Malaysia',
            'sumProp': 13529.36,
            'country': 110,
            'count': 105,
            'sumKill': 170
          },
          {
            'sumWound': 8507,
            'countryName': 'Philippines',
            'sumProp': 20724670.87,
            'country': 124,
            'count': 4733,
            'sumKill': 6078
          },
          {
            'sumWound': 6207,
            'countryName': 'Thailand',
            'sumProp': 13466460.94,
            'country': 153,
            'count': 3166,
            'sumKill': 2313
          },
          {
            'sumWound': 136,
            'countryName': 'East Timor',
            'sumProp': null,
            'country': 156,
            'count': 66,
            'sumKill': 257
          },
          {
            'sumWound': 28,
            'countryName': 'Vietnam',
            'sumProp': 2000000.0,
            'country': 168,
            'count': 11,
            'sumKill': 82
          }
        ]
      }
    },
    selectId: {
      // 外部传入，用于指定高亮的country名
      type: Number,
      default: -1
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
  computed: {
    selectName: function () {
      return this.getNameById(this.selectID)
    }
  },
  methods: {

    initChart () {
      var param = {}
      var sumKill = []
      var sumWound = []
      var count = []
      for (var i = 0; i < this.obj.length; i++) {
        var dicKill = {}
        dicKill.indicator = this.obj[i].countryName
        dicKill.value = -this.obj[i].sumKill / 5
        sumKill.push(dicKill)
        var dicWound = {}
        dicWound.indicator = this.obj[i].countryName
        dicWound.value = -this.obj[i].sumWound / 5
        sumWound.push(dicWound)
        var diccount = {}
        diccount.indicator = this.obj[i].countryName
        diccount.value = this.obj[i].count
        count.push(diccount)
      }
      param.count = count
      param.sumWound = sumWound
      param.sumKill = sumKill
      this.params = param
    },
    sendClick (name) {
      this.$emit('click-bar', this.getIdByName(name))
    },
    sendOver (name) {
      this.$emit('over-bar', this.getIdByName(name))
    },
    sendOut (name) {
      this.$emit('out-bar', this.getIdByName(name))
    },
    getNameById (id) {
      for (var i = 0; i < this.obj.length; i++) {
        if (id === Number(this.obj[i].country)) {
          return this.obj[i].countryName
        }
      }
      return ''
    },
    getIdByName (name) {
      for (var i = 0; i < this.obj.length; i++) {
        if (name === this.obj[i].countryName) {
          return Number(this.obj[i].country)
        }
      }
      return -1
    }
  },
  watch: {
    obj () {
      this.initChart()
    }
  }
}
</script>

