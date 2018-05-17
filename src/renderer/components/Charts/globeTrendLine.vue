<template>
  <ePolyline :id=id
        height="100%"
        width="100%"
        :data="params"
        :start="1970"
        :end="2017"
        :t="model"
        :selectName="selectName"
        backgroundColor='rgba(0,0,0,0)'
        @click-radar="send">
  </ePolyline>
</template>

<script>
import ePolyline from './ePolyline'

export default {
  name: 'globeTrendLine',
  components: {ePolyline},
  props: {
    id: {
      type: String,
      default: 'trend-line'
    },
    obj: {
      // 接受到的数据
      type: Array,
      default: function () {
        return []
      }
    },
    selectName: {
      // 外部传入，用于指定高亮的region名
      type: String,
      default: ''
    },
    model: {
      // 选择要画的图种类，有count、sumKill、sumProp三种值
      type: String,
      default: 'sumProp'
    }
  },
  data () {
    return {
      params: []
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {

    initChart () {
      var param = []
      var objCount = {}
      objCount.listName = this.model
      objCount.value = []
      for (var i = 0; i < this.obj.length; i++) {
        if (this.model === 'sumProp') {
          objCount.value.push(this.obj[i][this.model] / 1000000)
        } else {
          objCount.value.push(this.obj[i][this.model])
        }
      }
      param.push(objCount)
      this.params = param
    },
    send (param) {
      this.$emit('click-line', param)
    }
  },
  watch: {
    obj () {
      this.initChart()
    }
  }
}
</script>