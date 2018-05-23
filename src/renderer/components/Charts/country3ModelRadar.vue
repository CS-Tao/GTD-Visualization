<template>
  <radar :id=id
        height="100%"
        width="100%"
        :data="params"
        :title="model+' Type'"
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
    return {
      params: [
        {
          indicator: 'type1jfhgfhgfhdhdhfhgfhdhgdgfdgfdddgdgfdgfdgfdhgdgfqwertyuiopasdfghjkl',
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
    }
  },
  mounted () {
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

