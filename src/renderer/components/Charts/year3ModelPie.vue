<template>
  <pie :id='id'
        height="100%"
        width="100%"
        :data="params"
        :selectName="selectName"
        :title="model+' type'"
        :itemColor="color"
        @click-pie="send">
  </pie>
</template>


<script>
import pie from './pie'

export default {
  name: 'country3Modelpie',
  components: {pie},
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
    return {
      params: [],
      color: ''
    }
  },
  mounted () {
    if (this.model === 'target') { this.color = '#A60000' } else if (this.model === 'attack') { this.color = '#009999' } else { this.color = '#9FEE00' }
  },
  methods: {

    initChart () {
      if (Object.keys(this.obj).length === 0) {
        return
      }
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
      this.$emit('click-pie', param)
    }
  },
  watch: {
    obj () {
      this.initChart()
    },
    model (newModel, oldModel) {
      if (newModel === 'target') { this.color = '#A60000' } else if (newModel === '#attack') { this.color = '#009999' } else { this.color = '#9FE00' }
    }
  }
}
</script>

