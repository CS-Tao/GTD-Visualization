<template>
  <div class="wrap">
    <div class="clock">
      <ul>
        <li>
          <ul id="led-date-time0">
            <li v-for="n in 7" :key="n">
              <img :src="dateImgList[0][n-1]" width="100%" height="100%">
            </li>
          </ul>
        </li>
            <li>
          <ul id="led-date-time1">
            <li v-for="n in 7" :key="n">
              <img :src="dateImgList[1][n-1]" width="100%" height="100%">
            </li>
          </ul>
        </li>
        <li class="point"><span></span><span></span></li>
        <li>
          <ul id="led-date-time2">
            <li v-for="n in 7" :key="n">
              <img :src="dateImgList[2][n-1]" width="100%" height="100%">
            </li>
          </ul>
        </li>
        <li>
          <ul id="led-date-time3">
            <li v-for="n in 7" :key="n">
              <img :src="dateImgList[3][n-1]" width="100%" height="100%">
            </li>
          </ul>
        </li>
        <li class="point"><span></span><span></span></li>
          <li>
          <ul id="led-date-time4">
            <li v-for="n in 7" :key="n">
              <img :src="dateImgList[4][n-1]" width="100%" height="100%">
            </li>
          </ul>
        </li>
            <li>
          <ul id="led-date-time5">
            <li v-for="n in 7" :key="n">
              <img :src="dateImgList[5][n-1]" width="100%" height="100%">
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
      default: new Date()
    },
    freshInterval: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      BackImg,
      FrontImg,
      a: ['0 1 2 4 5 6', '2 5', '0 2 3 4 6', '0 2 3 5 6', '1 2 3 5', '0 1 3 5 6', '0 1 3 4 5 6', '0 2 5', '0 1 2 3 4 5 6', '0 1 2 3 5 6'],
      b: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五'],
      dateStr: Date(),
      weekStr: '',
      dateImgList: [
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
    this.showTime()
    setInterval(() => {
      this.showTime()
    }, 1000)
  },
  methods: {
    showTime () {
      var time = new Date()
      var y = time.getFullYear()
      var M = time.getMonth()
      var d = time.getDate()
      var h = time.getHours()
      var m = time.getMinutes()
      var s = time.getSeconds()
      M = M + 1
      var str = y.toString() + '年'
      if (M < 10) { str = str + '0' + M.toString() + '月' } else { str = str + M.toString() + '月' }
      if (d < 10) { str = str + '0' + d.toString() + '日' } else { str = str + d.toString() + '日' }

      this.dateStr = str
      this.weekStr = this.b[time.getDay()]
      this.modiflyNum(0, parseInt(h / 10))
      this.modiflyNum(1, h % 10)
      this.modiflyNum(2, parseInt(m / 10))
      this.modiflyNum(3, m % 10)
      this.modiflyNum(4, parseInt(s / 10))
      this.modiflyNum(5, s % 10)
    },
    modiflyNum (id, value) {
      var str = this.a[value]
      var cc = str.split(' ')
      for (let i = 0; i < 7; i++) {
        this.$set(this.dateImgList[id], i, this.BackImg)
        // this.dateImgList[id][i] = this.BackImg
      }
      for (let i = 0; i < cc.length; i++) {
        this.$set(this.dateImgList[id], parseInt(cc[i]), this.FrontImg)
        // this.dateImgList[id][parseInt(cc[i])] = this.FrontImg
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
.wrap .clock{height: 220px;}
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
.wrap .clock ul .point span{display:block;height: 20px;width: 20px;background: #a3ff19;margin:60px 15px;}
.wrap .date{position:relative;height: 100px; color: #a3ff19; font-size:80px;margin-top: 10px;border-bottom:3px solid red;}
.wrap .date span:first-child{float: left;margin-left: 10px;}
.wrap .date span:last-child{float: right;margin-right:30px;}
</style>
