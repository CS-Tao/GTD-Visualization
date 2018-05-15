<template>
  <div class="col-wrapper" :style="getWrapperHeight">
    <ul class="wheel-list" :style="getListTop" ref="wheel">
      <li class="wheel-item" v-for="item in scrollValues" :style="initWheelItemDeg(item.index)" :key=item.index>{{item.value}}</li>
    </ul>
    <div class="cover" :style="getCoverStyle"></div>
    <div class="divider" :style="getDividerStyle"></div>
  </div>
</template>
<script>
import Animate from '../../utils/animate'
const a = -0.003 // 加速度
const radius = 400 // 半径
const lineHeight = 100 // 文字行高
let isInertial = false // 是否正在惯性滑动
// 根据三角形余弦公式
// 反余弦得到弧度再转换为度数,这个度数是单行文字所占有的。
let deg = Math.round((Math.acos((((radius * radius) + (radius * radius)) - (lineHeight * lineHeight)) / (2 * radius * radius)) * 180) / Math.PI)
// deg这个值须360能整除，因为当滚动列占满一周后可以再次均匀的覆盖在上一周文字上；滚动时不会出现错位
while (360 % deg !== 0 && deg <= 360) {
  deg += 1
}
const singleDeg = deg
// 半圆下的内容条数
const space = Math.floor((360 / singleDeg) / 2)
export default {
  data () {
    return {
      values: [1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
      finger: {
        startY: 0,
        endY: 0,
        startTime: 0, // 开始滑动时间（单位：毫秒）
        entTime: 0, // 结束滑动时间（单位：毫秒）
        currentMove: 0,
        prevMove: 0
      },
      range: {
        start: -space,
        end: space,
        space
      },
      if_mousedown: false,
      curYear: 1970,
      preYear: 1970
    }
  },
  // props: {
  //   values: [1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
  //   finger: {
  //     startY: 0,
  //     endY: 0,
  //     startTime: 0, // 开始滑动时间（单位：毫秒）
  //     entTime: 0, // 结束滑动时间（单位：毫秒）
  //     currentMove: 0,
  //     prevMove: 0
  //   },
  //   range: {
  //     start: -space,
  //     end: space,
  //     space
  //   },
  //   if_mousedown: false
  // },
  computed: {
    scrollValues () {
      const result = []
      for (let i = this.range.start; i <= this.range.end; i += 1) {
        result.push({
          value: this.getRangeData(i),
          index: i
        })
      }
      return result
    },
    getListTop () {
      return {
        top: `${radius - Math.round(lineHeight / 2)}px`,
        height: `${lineHeight}px`
      }
    },
    getWrapperHeight () {
      return {
        height: `${2 * radius}px`
      }
    },
    getCoverStyle () {
      return {
        backgroundSize: `100% ${radius - Math.round(lineHeight / 2)}px`
      }
    },
    getDividerStyle () {
      return {
        top: `${radius - Math.round(lineHeight / 2)}px`,
        height: `${lineHeight - 2}px`
      }
    },
    animate () {
      return new Animate()
    }
  },
  mounted () {
    this.$el.addEventListener('mousedown', this.listenerTouchStart, false)
    this.$el.addEventListener('mousemove', this.listenerTouchMove, false)
    this.$el.addEventListener('mouseup', this.listenerTouchEnd, false)
  },
  beforeDestory () {
    this.$el.removeEventListener('mousedown', this.listenerTouchStart, false)
    this.$el.removeEventListener('mousemove', this.listenerTouchMove, false)
    this.$el.removeEventListener('mouseup', this.listenerTouchEnd, false)
  },
  // watch: {
  //   finger (newfinger, oldfinger) {
  //     if (newfinger.currentMove !== oldfinger.currentMove && this.if_mousedown === false) {
  //       this.$emit('change-year', this.getSelectValue(newfinger.currentMove))
  //     }
  //   }
  // },

  // watch: {
  //   curYear (newYear, oldYear) {
  //   }
  // },
  methods: {
    initWheelItemDeg (index) {
      return {
        transform: `rotate3d(1, 0, 0, ${(-1 * index) * singleDeg}deg) translate3d(0, 0, ${radius}px)`,
        height: `${lineHeight}px`,
        lineHeight: `${lineHeight}px`
      }
    },
    listenerTouchStart (ev) {
      ev.stopPropagation()
      ev.preventDefault()
      isInertial = false
      this.finger.startY = ev.pageY
      this.finger.prevMove = this.finger.currentMove
      this.finger.startTime = Date.now()
      this.if_mousedown = true
    },
    listenerTouchMove (ev) {
      if (this.if_mousedown === true) {
        ev.stopPropagation()
        ev.preventDefault()
        const move = (this.finger.startY - ev.pageY) + this.finger.prevMove
        this.finger.currentMove = move
        this.$refs.wheel.style.transform = `rotate3d(1, 0, 0, ${(move / lineHeight) * singleDeg}deg)`
        this.updateRange(Math.round(move / lineHeight))
      }
    },
    listenerTouchEnd (ev) {
      ev.stopPropagation()
      ev.preventDefault()
      this.finger.endY = ev.pageY
      this.finger.endTime = Date.now()
      this.getInertiaDistance()
      this.if_mousedown = false
      this.curYear = this.getRangeData(Math.abs(this.finger.currentMove / lineHeight))
      // if (this.curYear !== this.preYear) {
      //   this.$emit('change-year', this.curYear)
      //   this.preYear = this.curYear
      // }
      this.$emit('change-year', this.curYear)
    },
    updateRange (spinAim) {
      this.range.start = (this.range.space * -1) + spinAim
      this.range.end = this.range.start + (this.range.space * 2)
    },
    getRangeData (index) {
      index %= this.values.length
      return this.values[index >= 0 ? index : index + this.values.length]
    },
    getSelectValue (move) {
      const index = Math.abs(move / lineHeight)
      const pickValue = this.getRangeData(index)
      this.$emit('select', pickValue)
    },
    /**
       * 求移动速度（v = s / t），判断用户操作快慢，从而得到惯性的滑动距离
       */
    getInertiaDistance () {
      // 移动距离
      const s = this.finger.startY - this.finger.endY
      // 移动时间
      const t = this.finger.endTime - this.finger.startTime
      // 移动速度
      const v = s / t
      const absV = Math.abs(v)
      isInertial = true
      this.inertia(absV, Math.floor(absV / v), 0)
    },
    /**
       * 用户结束滑动，应该慢慢放慢，最终停止。从而需要 a(加速度)
       * @param start 开始速度
       * @param position 速度方向，值: 正负1
       * @param target 结束速度
       */
    inertia (start, position, target) {
      if (start <= target || !isInertial) {
        this.animate.stop()
        this.finger.prevMove = this.finger.currentMove
        this.updateRange(Math.round(this.finger.currentMove / lineHeight))
        this.getSelectValue(this.finger.currentMove)
        return
      }
      // 这段时间走的位移 S = vt + 1/2at^2;
      const move = (position * start * (1000 / 60)) + (0.5 * a * (1000 / 60) * (1000 / 60)) + this.finger.currentMove
      // 根据求末速度公式： v末 = v初 + at
      const newStart = (position * start) + (a * (1000 / 60))
      let moveDeg = (move / lineHeight) * singleDeg
      let actualMove = move
      // 已经到达目标
      if (newStart <= target) {
        moveDeg = Math.round(move / lineHeight) * singleDeg
        actualMove = Math.round(move / lineHeight) * lineHeight
        this.$refs.wheel.style.transition = 'transform 700ms cubic-bezier(0.19, 1, 0.22, 1)'
      } else {
        this.$refs.wheel.style.transition = ''
      }
      this.finger.currentMove = actualMove
      this.$refs.wheel.style.transform = `rotate3d(1, 0, 0, ${moveDeg}deg)`
      this.updateRange(Math.round(this.finger.currentMove / lineHeight))
      this.animate.start(this.inertia.bind(this, newStart, position, target))
    }
  }
}
</script>

<style lang="scss">
  ul, li{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .col-wrapper{
    position: relative;
    border: 1px solid #CCC;
    height: 300px;
    overflow: hidden;
    text-align: center;
    .wheel-list{
      position: absolute;
      width: 100%;
      transform-style: preserve-3d;
      .wheel-item{
        backface-visibility: hidden;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
      }
    }
    .cover{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-image: linear-gradient(180deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),linear-gradient(0deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));
      background-position: top,bottom;
      background-repeat: no-repeat;
    }
    .divider{
      position: absolute;
      width: 100%;
      left: 0;
      border-top: 1px solid #cccccc;
      border-bottom: 1px solid #cccccc;
    }
  }
</style>
