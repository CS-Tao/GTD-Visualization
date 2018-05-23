<template>
  <div class="wrap">
    <div class="clock">
      <ul>
        <li v-for="m in 4" :key="m">
          <ul :id="'led-date-time' + (m-1)">
            <li v-for="n in 7" :key="n">
              <img :src="dateImgList[m-1][n-1]" width="100%" height="100%">
            </li>
          </ul>
        </li>

        <li class="point"><span></span></li>

        <li v-for="m in 2" :key="m+4">
          <ul :id="'led-date-time' + ((m-1) + 4)">
            <li v-for="n in 7" :key="n">
              <img :src="dateImgList[m-1+4][n-1]" width="100%" height="100%">
            </li>
          </ul>
        </li>

        <li class="point"><span></span></li>

        <li v-for="m in 2" :key="m+6">
          <ul :id="'led-date-time' + ((m-1) + 6)">
            <li v-for="n in 7" :key="n">
              <img :src="dateImgList[m-1+6][n-1]" width="100%" height="100%">
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BackImg from './images/back.png'
import FrontImg from './images/front.png'

export default {
  name: 'LedDateDisplay',
  props: {
    date: {
      type: Date,
      default: () => {
        return new Date()
      }
    },
    freshInterval: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      backImg: BackImg,
      frontImg: FrontImg,
      numMap: ['0 1 2 4 5 6', '2 5', '0 2 3 4 6', '0 2 3 5 6', '1 2 3 5', '0 1 3 5 6', '0 1 3 4 5 6', '0 2 5', '0 1 2 3 4 5 6', '0 1 2 3 5 6'],
      dateImgList: [
        [FrontImg, FrontImg, FrontImg, FrontImg, FrontImg, FrontImg, FrontImg],
        [FrontImg, FrontImg, FrontImg, FrontImg, FrontImg, FrontImg, FrontImg],
        [FrontImg, FrontImg, FrontImg, FrontImg, FrontImg, FrontImg, FrontImg],
        [FrontImg, FrontImg, FrontImg, FrontImg, FrontImg, FrontImg, FrontImg],
        [FrontImg, FrontImg, FrontImg, FrontImg, FrontImg, FrontImg, FrontImg],
        [FrontImg, FrontImg, FrontImg, FrontImg, FrontImg, FrontImg, FrontImg],
        [FrontImg, FrontImg, FrontImg, FrontImg, FrontImg, FrontImg, FrontImg],
        [FrontImg, FrontImg, FrontImg, FrontImg, FrontImg, FrontImg, FrontImg]
      ]
    }
  },
  computed: {
  },
  mounted () {
  },
  watch: {
    date () {
      this.showDate(this.date)
    }
  },
  methods: {
    showDate (date) {
      let y = date.getFullYear()
      let m = date.getMonth()
      let d = date.getDate()
      m = m + 1

      let y1 = parseInt(y / 1000) // 千
      let y2 = parseInt((y - y1 * 1000) / 100) // 百
      let y3 = parseInt((y - y1 * 1000 - y2 * 100) / 10) // 十
      let y4 = parseInt(y - y1 * 1000 - y2 * 100 - y3 * 10) // 个

      this.modiflyNum(0, y1)
      this.modiflyNum(1, y2)
      this.modiflyNum(2, y3)
      this.modiflyNum(3, y4)
      this.modiflyNum(4, parseInt(m / 10))
      this.modiflyNum(5, m % 10)
      this.modiflyNum(6, parseInt(d / 10))
      this.modiflyNum(7, d % 10)
    },
    modiflyNum (id, value) {
      var str = this.numMap[value]
      var cc = str.split(' ')
      for (let i = 0; i < 7; i++) {
        this.$set(this.dateImgList[id], i, this.backImg)
      }
      for (let i = 0; i < cc.length; i++) {
        this.$set(this.dateImgList[id], parseInt(cc[i]), this.frontImg)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

*{margin:0;padding: 0;}
body{background: black;}
li{list-style-type: none;}
.wrap{margin:0 auto;}
.wrap .clock{height: 220px; min-width: 1250px;}
.wrap .clock ul li{width: 120px;height: 220px;float: left;margin:0 10px;}
.wrap .clock ul li ul{position: relative;}
.wrap .clock ul li ul li{width:90px;height: 20px;display: block;}
.wrap .clock ul li ul li:nth-child(1){position:absolute;left: 15px;}
.wrap .clock ul li ul li:nth-child(2){position:absolute;transform:rotateZ(90deg);top:0px;left:-35px;top:50px;}
.wrap .clock ul li ul li:nth-child(3){position:absolute;transform:rotateZ(90deg);top:0px;left:65px;top:50px;}
.wrap .clock ul li ul li:nth-child(4){position:absolute;top: 100px;left: 15px;}
.wrap .clock ul li ul li:nth-child(5){position:absolute;transform:rotateZ(90deg);top:150px;left:-35px;}
.wrap .clock ul li ul li:nth-child(6){position:absolute;transform:rotateZ(90deg);left:65px;top: 150px;}
.wrap .clock ul li ul li:nth-child(7){position:absolute;top: 200px;left: 15px;}
.wrap .clock ul .point{width: 30px;}
.wrap .clock ul .point span{display:block; position: absolute; height: 20px;width: 20px;background: #ff6506;margin:0px 15px; bottom: 0px }
.wrap .date{position:relative;height: 100px; color: #ff6506; font-size:80px;margin-top: 10px;border-bottom:3px solid red;}
.wrap .date span:first-child{float: left;margin-left: 10px;}
.wrap .date span:last-child{float: right;margin-right:30px;}
</style>
