<template>
  <bar :id='id'
        height="100%"
        width="100%"
        :data="params"
        :selectName="selectName"
        :vertical="false"
        title="本年恐怖袭击造成的总损失及人员伤亡"
        formatter="{b}: <br/>造成损失 : {c1} <br/>受伤人数 : {c2} <br/>死亡人数 : {c3}"
        @click-bar="sendClick"
        @over-bar="sendOver"
        @out-bar="sendOut">
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
        return []
      }
    },
    selectId: {
      // 外部传入，用于指定高亮的region名
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
        if (id === Number(this.obj[i].region)) {
          return this.obj[i].regionName
        }
      }
      return ''
    },
    getIdByName (name) {
      for (var i = 0; i < this.obj.length; i++) {
        if (name === this.obj[i].regionName) {
          return Number(this.obj[i].region)
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

