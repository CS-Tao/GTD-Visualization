<template>
  <div>
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
      return this.date
    }
  }
}
</script>

<style lang="scss" scoped>
.DateDisplayText {
    color:turquoise;
}
</style>
