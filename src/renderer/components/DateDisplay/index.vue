<template>
  <div class="container">
    <span>
    <transition name="slide-fade">
    <p class="DateDisplayText">{{ dateDisplay }}</p>
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
    }
  },
  computed: {
    dateDisplay () {
      return this.date.getFullYear() + '年' + (this.date.getMonth() + 1) + '月' + this.date.getDate() + '日'
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
