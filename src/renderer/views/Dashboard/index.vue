<template>
  <div>
    <leaflet-view class="map-view"></leaflet-view>
    <date-display class="date-display" :date="date"></date-display>
  </div>
</template>

<script>
import LeafletView from '@/components/MapView/LeafletView'
import DateDisplay from '@/components/DateDisplay'
import { getGeneral } from '@/api/dashboardApi'

export default {
  components: {
    LeafletView,
    DateDisplay
  },
  data () {
    return {
      date: new Date()
    }
  },
  mounted () {
    getGeneral({
      year: 2000,
      format: 'json'
    }).then(data => {
      this.$notify.success(JSON.stringify(data.data.type))
    })
  }
}
</script>

<style lang="scss" scoped>
.map-view {
  width: 100%;
  height: 100%;
}
.date-display {
  position: fixed;
  z-index: 999;
  bottom: 0;
  right: 0;
  margin: 50px;
}
</style>
