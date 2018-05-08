<template>
  <div class="container">
    <span class="DateDisplayText">{{ dateDisplayText }}</span>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: Date,
      default: new Date(2018, 1, 1)
    }
  },
  data () {
    return {

    }
  },
  computed: {
    dateDisplayText () {
      return this.date.getFullYear() + ' 年'
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
    color:black;
    font-size: 3rem;
  }
}
</style>
