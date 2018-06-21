<template>
  <div class="map-view" v-loading="loading" element-loading-text="Loading Data...">
    <leaflet-view mapId="dashboard-leaflet-map" :currentDailyData="dailyDataForMapView"></leaflet-view>
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
      mapId: 'dashboard-leaflet-map',
      year: 2001,
      geojsonData: {},
      currentDay: 1,
      dailyDataForMapView: [],
      currentDate: new Date(),
      totalDays: 365,
      freshInterval: 300,
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'routerViewMode'
    ])
  },
  mounted () {
    // Add this view to cache
    if (this.$route.name) {
      this.$store.dispatch('addVisitedViews', this.$route)
    }
    getGeneral({
      year: this.year,
      format: 'json'
    })
      .then(response => {
        this.geojsonData = response.data
        if (this.geojsonData && this.geojsonData.features &&
        this.geojsonData.features.length > 1 && this.geojsonData.features[0]) {
          this.year = this.geojsonData.features[0].properties.year
          if (isLeapYear(this.geojsonData.features[0].properties.year)) {
            this.totalDays = 366
          }
        }
        if (this.loading) { this.loading = false }
        this.startUpdateTimer()
      })
      .catch(() => {
        if (this.loading) { this.loading = false }
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
      // const that = this
      // if (this.dailyDataForMapView.length > 0 && this.routerViewMode === 0) {
      //   const dateStr = that.dateToEnglish(that.currentDate)
      //   let messageStr = '<div style="color: rgb(230, 100, 23);">' + dateStr + '</div>'
      //   for (var i = 0; i < that.dailyDataForMapView.length; i++) {
      //     let placeStr = ''
      //     if (that.dailyDataForMapView[i].properties.city !== null) {
      //       placeStr += that.dailyDataForMapView[i].properties.city + ', '
      //       placeStr += that.dailyDataForMapView[i].properties.country.countryName
      //     } else {
      //       placeStr += that.dailyDataForMapView[i].properties.country.countryName
      //     }
      //     messageStr += '<div style="color: rgb(253, 227, 80);>' + placeStr + '</div>'
      //   }
      //   that.$notify({
      //     message: messageStr,
      //     duration: 1000,
      //     position: 'top-right',
      //     showClose: false,
      //     offset: 100,
      //     dangerouslyUseHTMLString: true
      //   })
      // }
      // this.$createElement('div', {style: 'color: #eee'}, '地点：' + val.city + val.country)
      // console.log(this.currentDate.getFullYear() + '年' +
      //     (this.currentDate.getMonth() + 1) + '月' +
      //     this.currentDate.getDate() + '日')
    },
    dateToEnglish (date) {
      const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Spt', 'Oct', 'Nov', 'Dec']
      const w = ['Monday', 'Tuseday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      const d = ['st', 'nd', 'rd', 'th']
      const mn = date.getMonth()
      const wn = date.getDay()
      const dn = date.getDate()
      let dns = ''
      if (((dn) < 1) || ((dn) > 3)) {
        dns = d[3]
      } else {
        dns = d[(dn) - 1]
        if ((dn === 11) || (dn === 12)) {
          dns = d[3]
        }
      }
      return m[mn] + ' ' + dn + dns + ' ' + w[wn - 1] + ' ' + date.getFullYear()
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
