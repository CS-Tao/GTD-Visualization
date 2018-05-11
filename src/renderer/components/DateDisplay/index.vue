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
    },
    freshInterval: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      show: true,
      show2: false
    }
  },
  methods: {
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
      return this.date.getFullYear() + ' 年' + (this.date.getMonth() + 1) + '月' + this.date.getDate() + '日'
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  .DateDisplayText {
    color:rgba(253, 253, 253, 0.61);
    font-size: 3rem;
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
