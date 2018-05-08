<template>
  <div>
    <leaflet-view class="map-view"></leaflet-view>
    <date-display class="date-display" :date="date"></date-display>
  </div>
</template>

<script>
import LeafletView from '@/components/MapView/LeafletView'
import DateDisplay from '@/components/DateDisplay'

export default {
  components: {
    LeafletView,
    DateDisplay
  },
  data () {
    return {
      date: new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
.map-view {
  width: 100%;
  height: 100%;
}
.date-display {
  width: 100%;
  height: 100%;
}
</style>
