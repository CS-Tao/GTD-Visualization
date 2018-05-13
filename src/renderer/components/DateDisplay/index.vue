<template>
  <div class="container">
    <transition name="slide-fade">
    <p v-if="show" class="DateDisplayText">{{ dateDisplayText }}</p>
    </transition>
    <!-- <transition name="slide-fade">
    <p v-if="show2" class="DateDisplayText">{{ dateDisplayText }}</p>
    </transition> -->
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: Date,
      default: new Date()
    }
  },
  data () {
    return {
      show: true,
      show2: false
    }
  },
  methods: {
    addZero (num) {
      // add 0 when month or day less than 10
      if (num >= 10) {
        return num + ''
      } else {
        return '0' + num + ''
      }
    }
    // timedCount () {
    //   if (this.num < this.date_arr.length - 1) {
    //     this.num += 0.5
    //     this.show = !this.show
    //     setTimeout(this.timedCount, 1000)
    //   }
    // }
  },
  watch: {
    date (newDate, oldDate) {
      // if (newDate !== oldDate) { this.show = !this.show }
      // this.show2 =!this.show2
    }
  },
  computed: {
    dateDisplayText () {
      return this.date.getFullYear() + ' 年' + this.addZero(this.date.getMonth() + 1) + ' 月' + this.addZero(this.date.getDate()) + ' 日'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.container {
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  .DateDisplayText {
    color: $yo-2;
    font-size: 2.5rem;
  }
}

.slide-fade-enter-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter
{
  transform: translateY(25px);
  opacity: 0;
}
.slide-fade-leave-to{
  transform: translateY(-25px);
  opacity: 0;
}
</style>
