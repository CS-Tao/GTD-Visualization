<template>
  <div class="map-view">
    <leaflet-view :currentDailyData="dailyDataForMapView"></leaflet-view>
    <date-display class="date-display" :date="currentDate" :freshInterval="freshInterval" :hidden="routerViewMode === 2"></date-display>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LeafletView from '@/components/MapView/LeafletView'
import DateDisplay from '@/components/LedDateDisplay'
import { isLeapYear, getDateByDaysInYear } from '@/utils'
import { getGeneral } from '@/api/dashboardApi'

export default {
  components: {
    LeafletView,
    DateDisplay
  },
  data () {
    return {
      year: 1970,
      geojsonData: {},
      currentDay: 1,
      dailyDataForMapView: [],
      currentDate: new Date(),
      totalDays: 365,
      freshInterval: 300
    }
  },
  computed: {
    ...mapGetters([
      'routerViewMode'
    ])
  },
  mounted () {
    if (this.$route.name) {
      this.$store.dispatch('addVisitedViews', this.$route)
    }
    getGeneral({
      year: this.year,
      format: 'json'
    }).then(response => {
      this.geojsonData = response.data
      if (this.geojsonData && this.geojsonData.features &&
      this.geojsonData.features.length > 1 && this.geojsonData.features[0]) {
        this.year = this.geojsonData.features[0].properties.year
        if (isLeapYear(this.geojsonData.features[0].properties.year)) {
          this.totalDays = 366
        }
      }
      this.startUpdateTimer()
    })
  },
  methods: {
    startUpdateTimer () {
      setInterval(this.updateDailyData, this.freshInterval)
    },
    updateDailyData () {
      // Update data for MapView
      this.dailyDataForMapView = this.geojsonData.features.filter(item => {
        return item.properties.dayInYear === this.currentDay
      })
      if (this.dailyDataForMapView && this.dailyDataForMapView.length > 0) {
        // Update date for DateDisplay component
        this.currentDate = new Date(
          this.dailyDataForMapView[0].properties.year,
          this.dailyDataForMapView[0].properties.month - 1,
          this.dailyDataForMapView[0].properties.day)
      } else {
        this.currentDate = getDateByDaysInYear(this.currentDay, this.year)
      }
      this.currentDay = this.currentDay % this.totalDays + 1
      // console.log(this.currentDate.getFullYear() + '年' +
      //     (this.currentDate.getMonth() + 1) + '月' +
      //     this.currentDate.getDate() + '日')
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
  margin: 20px!important;
  transform: scale(0.3);
  transform-origin: 100% 100%;
  border-width: 2px 0;
  padding: 20px;
  border-radius: 50px;
  box-shadow: 0 0 60px orange;
}
</style>
