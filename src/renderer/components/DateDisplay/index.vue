<template>
  <div class="container">
    <span>
    <!-- <transition name="slide-fade">
    <span v-if="show" class="DateDisplayText">{{ dateDisplayYear }}</span>
    </transition>
    <span class="DateDisplayText"> 年 </span>
    <transition name="slide-fade">
    <span v-if="show" class="DateDisplayText">{{ dateDisplayMonth }}</span>
    </transition>
    <span class="DateDisplayText"> 月 </span>
    <transition name="slide-fade">
    <span v-if="show" class="DateDisplayText">{{ dateDisplayDay }}</span>
    </transition>
    <span class="DateDisplayText"> 日 </span> -->
    <transition name="slide-fade">
    <p v-if="show" class="DateDisplayText">{{ dateDisplay }}</p>
    </transition>
    </span>
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
      timer: false
    }
  },
  methods: {
    change_show () {
      this.show = !this.show
    }
    // display_loop () {
    //   this.change_show()
    //   setTimeout(this.display_loop(), 1000)
    // }
  },
  watch: {
    date (newDate, oldDate) {
      // if (this.timer === false) {
      //   this.timer = true
      //   this.display_loop()
      // }
      this.change_show()
      setTimeout(this.change_show(), this.freshInterval / 2)
    }
  },
  computed: {
    // dateDisplayYear () {
    //   return this.date.getFullYear()
    // },
    // dateDisplayMonth () {
    //   return this.date.getMonth() + 1
    // },
    // dateDisplayDay () {
    //   return this.date.getDate()
    // },
    dateDisplay () {
      return this.date.getFullYear() + '年' + (this.date.getMonth() + 1) + '月' + this.date.getDate() + '日'
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
    color:rgba(255, 150, 40, 1);
    font-size: 2.5rem;
  }
}

.slide-fade-enter-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter{
  transform: translateY(25px);
  opacity: 0;
}
.slide-fade-leave-to{
  transform: translateY(-25px);
  opacity: 0;
}
</style>
