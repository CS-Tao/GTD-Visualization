<template>
  <scatter :id='id'
        height="100%"
        width="100%"
        :data="params"
        :time="timeList"
        :countryName="[selectName]">
  </scatter>
</template>

<script>
import scatter from './scatter'

export default {
  name: 'countryScatter',
  components: {scatter},
  props: {
    id: {
      type: String,
      default: ''
    },
    countryNameList: {
      type: Array,
      default () {
        return [
          {id: 0, name: 'Canada'},
          {id: 1, name: 'Greenland'},
          {id: 2, name: 'Iceland'},
          {id: 3, name: 'United States'}
        ]
      }
    },
    startString: {
      type: String,
      default () {
        return '19900101'
      }
    },
    endString: {
      type: String,
      default () {
        return '19910101'
      }
    },
    obj: {
      // 接受到的数据
      type: Object,
      default: function () {
        return {}
      }
    },
    selectId: {
      // 外部传入，用于指定高亮的country名
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      params: [],
      timeList: [],
      dataList: {},
      monthList: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    }
  },
  mounted () {
    this.initChart()
  },
  computed: {
    selectName: function () {
      return this.getNameById(this.selectId)
    },
    start () {
      return (Number(this.startString.substring(0, 4)) - 1970) * 12 + Number(this.startString.substring(4, 6)) - 1
    },
    end () {
      return (Number(this.endString.substring(0, 4)) - 1970) * 12 + Number(this.endString.substring(4, 6))
    }
  },
  watch: {
    obj () {
      this.initChart()
    },
    endString (newEnd, oldEnd) {
      var res = []
      if (this.start >= newEnd) {
        return
      }
      for (var i = this.start; i < newEnd; i++) {
        res.push(this.monthList[i % 12])
      }
      this.timeList = res
    },
    selectId (newId, oldId) {
      if (Object.keys(this.obj).length === 0 || newId === -1) {
        return
      }
      var d = this.dataList[this.getNameById(newId)]
      this.params = d
    }
  },
  methods: {

    initChart () {
      if (Object.keys(this.obj).length === 0 || this.selectId === -1) {
        return
      }
      var res = []
      if (this.start >= this.end) {
        return
      }
      for (var k = this.start; k < this.end; k++) {
        res.push(this.monthList[k % 12])
      }
      this.timeList = res
      var list = this.obj.features
      for (var j = 0; j < this.countryNameList.length; j++) {
        this.dataList[this.countryNameList[j].name] = Array.apply(null, Array(this.timeList.length)).map(() => 0)
      }
      for (var i = 0; i < list.length; i++) {
        if (list[i].properties.month === null) {
          list[i].properties.month = Number(this.startString.substring(4, 6)) - 1
        }
        var nowTime = (list[i].properties.year - 1970) * 12 + list[i].properties.month - 1
        if (typeof (this.dataList[list[i].properties.country.countryName]) === 'undefined') {
        } else { this.dataList[list[i].properties.country.countryName][this.getTimeValue(nowTime)]++ }
      }
      var d = this.dataList[this.getNameById(this.selectId)]
      this.params = d
    },
    getTimeValue (time) {
      var day = Math.floor((time - this.start) / (this.end - this.start) * this.timeList.length)
      return day
    },
    getNameById (id) {
      if (id < 0) { return '' }
      for (var i = 0; i < this.countryNameList.length; i++) {
        if (this.countryNameList[i].id === id) {
          return this.countryNameList[i].name
        }
      }
    }
  }
}
</script>

