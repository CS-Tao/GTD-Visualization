<template>
  <div>
    <leaflet-view class="map-view" :currentDailyData="dailyDataForMapView"></leaflet-view>
    <date-display class="date-display" :date="currentDate"></date-display>
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
      geojsonData: {},
      currentDay: 1,
      dailyDataForMapView: [],
      currentDate: new Date()
    }
  },
  mounted () {
    getGeneral({
      year: 2000,
      format: 'json'
    }).then(response => {
      this.geojsonData = response.data
      this.startUpdateTimer()
    })
  },
  methods: {
    startUpdateTimer () {
      setInterval(this.updateDailyData, 1000)
    },
    updateDailyData () {
      // Update data for MapView
      this.dailyDataForMapView = this.geojsonData.features.filter(item => {
        return item.properties.month === this.currentDay
      })
      if (this.dailyDataForMapView || this.dailyDataForMapView.length > 0) {
        // Update date for DateDisplay component
        this.currentDate = new Date(
          this.dailyDataForMapView[0].properties.year,
          this.dailyDataForMapView[0].properties.month - 1,
          this.dailyDataForMapView[0].properties.day)
        console.log(
          (this.dailyDataForMapView[0].properties.year) + '年' +
          (this.dailyDataForMapView[0].properties.month) + '月' +
          (this.dailyDataForMapView[0].properties.day) + '日, 转换后: ' +
          this.currentDate.getFullYear() + '年' +
          (this.currentDate.getMonth() + 1) + '月' +
          this.currentDate.getDate() + '日'
        )
      }
      this.currentDay = this.currentDay % 12 + 1
      // console.log(this.currentDay)
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
  position: fixed;
  z-index: 999;
  bottom: 0;
  right: 0;
  margin: 50px;
}
</style>
