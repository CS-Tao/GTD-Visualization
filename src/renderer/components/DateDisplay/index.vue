<template>
  <div @click="timedCount" class="container">
    <transition  name="slide-fade">
    <p v-if="show" class="DateDisplayText">{{ dateDisplayText }}</p>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    
  },
  data () {
    return {
      show: true,
      num: 0,
      date_arr: [new Date(2013, 1, 1), new Date(2014, 1, 1), new Date(2015, 1, 1), new Date(2016, 1, 1), new Date(2017, 1, 1), new Date(2018, 1, 1)]
    }
  },
  methods: {
    timedCount(){
      if(this.num<this.date_arr.length-1){
      this.num += 0.5
      this.show = !this.show
      setTimeout(this.timedCount,1000)
      }
    }
  },
  computed: {
    dateDisplayText () {
      return this.date_arr[this.num].getFullYear() + ' 年'
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
  // transition: all .3s ease;
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
