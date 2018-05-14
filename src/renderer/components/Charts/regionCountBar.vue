<template>
  <bar :id=id
        height="100%"
        width="100%"
        :data="params"
        :selectName="selectName"
        xPosition="top"
        textColor="#FFFB73"
        backgroundColor="rgba(128,0,0,0)"
        :vertical="true"
        @click-bar="sendClick"
        @over-bar="sendOver"
        @out-bar="sendOut">
  </bar>
</template>

<script>
import bar from './bar'

export default {
  name: 'regionCountBar',
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
            'sumKill': 0,
            'regionName': 'North America',
            'count': 37,
            'sumWound': 37,
            'sumProp': 3667250.0
          },
          {
            'region': 2,
            'sumKill': 440,
            'regionName': 'Central America & Caribbean',
            'count': 147,
            'sumWound': 200,
            'sumProp': 3500000.0
          },
          {
            'region': 3,
            'sumKill': 1,
            'regionName': 'South America',
            'count': 7,
            'sumWound': 9,
            'sumProp': null
          },
          {
            'region': 4,
            'sumKill': 3,
            'regionName': 'East Asia',
            'count': 21,
            'sumWound': 22,
            'sumProp': null
          },
          {
            'region': 5,
            'sumKill': 413,
            'regionName': 'Southeast Asia',
            'count': 207,
            'sumWound': 847,
            'sumProp': 1167000.0
          },
          {
            'region': 6,
            'sumKill': 1055,
            'regionName': 'South Asia',
            'count': 267,
            'sumWound': 1470,
            'sumProp': 0.0
          },
          {
            'region': 8,
            'sumKill': 41,
            'regionName': 'Western Europe',
            'count': 206,
            'sumWound': 138,
            'sumProp': 70000.0
          },
          {
            'region': 9,
            'sumKill': 406,
            'regionName': 'Eastern Europe',
            'count': 285,
            'sumWound': 725,
            'sumProp': 28700.0
          },
          {
            'region': 10,
            'sumKill': 727,
            'regionName': 'Middle East & North Africa',
            'count': 269,
            'sumWound': 1005,
            'sumProp': null
          },
          {
            'region': 11,
            'sumKill': 965,
            'regionName': 'Sub-Saharan Africa',
            'count': 171,
            'sumWound': 601,
            'sumProp': 688.0
          },
          {
            'region': 12,
            'sumKill': 7,
            'regionName': 'Australasia & Oceania',
            'count': 5,
            'sumWound': 17,
            'sumProp': null
          }
        ]
      }
    },
    selectId: {
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
  computed: {
    selectName: function () {
      return this.getNameById(this.selectId)
    }
  },
  methods: {

    initChart () {
      var param = {}
      var attackCount = []
      for (var i = 0; i < this.obj.length; i++) {
        var dic = {}
        dic.indicator = this.obj[i].regionName
        dic.value = this.obj[i].count
        attackCount.push(dic)
      }
      param.attackCount = attackCount
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
    getIdByName (id) {
      for (var i = 0; i < this.obj.length; i++) {
        if (id === this.obj[i].region) {
          return this.obj[i].regionName
        }
      }
      return ''
    },
    getNameById (name) {
      for (var i = 0; i < this.obj.length; i++) {
        if (name === this.obj[i].regionName) {
          return this.obj[i].region
        }
      }
      return ''
    }
  },
  watch: {
    obj () {
      this.initChart()
    }
  }
}
</script>

