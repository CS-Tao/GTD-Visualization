<template>
  <radar :id=id
        height="100%"
        width="100%"
        :data="params"
        :selectName="selectName"
        @click-radar="send">
  </radar>
</template>


<script>
import radar from './radar'

export default {
  name: 'country3ModelRadar',
  components: {radar},
  props: {
    id: {
      type: String,
      default: ''
    },
    obj: {
      type: Object,
      default: function () {
        return {}
      }
    },
    selectName: {
      // 外部传入，用于指定高亮的region名
      type: String,
      default: ''
    },
    model: {
      // 选择要画的图种类，有weapon、attack、target三种值
      type: String,
      default: 'target'
    }
  },
  data () {
    var param = []
    for (var i = 0; i < 5; i++) {
      var dic = {}
      dic.indicator = this.obj[this.model][i][this.model + 'TypeName']
      dic.value = this.obj[this.model][i].count
      param.push(dic)
    }
    return {
      params: param
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {

    initChart () {
      var param = []
      for (var i = 0; i < 5; i++) {
        var dic = {}
        dic.indicator = this.obj[this.model][i][this.model + 'TypeName']
        dic.value = this.obj[this.model][i].count
        param.push(dic)
      }
      this.params = param
    },
    send (param) {
      this.$emit('click-radar', param)
    }
  },
  watch: {
    obj () {
      this.initChart()
    }
  }
}
</script>

