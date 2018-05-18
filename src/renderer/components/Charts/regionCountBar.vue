<template>
  <bar :id="id"
        height="100%"
        width="100%"
        :data="params"
        :selectName="selectName"
        xPosition="top"
        textColor="#FF9900"
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
      type: [Object, Array],
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

