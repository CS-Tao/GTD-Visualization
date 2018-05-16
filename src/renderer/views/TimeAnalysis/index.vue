<template>
<div class='time-analysis-container'>
  <el-date-picker
   class="fixed-normal datepicker-view"
   :class="{'fixed-silebar-visiable': sidebar.opened}"
   v-on:change="getDate"
   v-model="dateRange" 
   type="daterange" 
   value-format="yyyyMMdd" 
   format="yyyy 年 MM 月 dd 日" 
   :unlink-panels="true"
   start-placeholde="起始日期" 
   end-placeholde="结束日期">
   </el-date-picker>
  <time-analysis-map-view 
  class="map-view" 
  :class="{'country-map-view': countryCountBarDisplay}"
  v-on:map-region-hover="selectElement" 
  v-on:map-region-click="clickListener"
  v-on:map-region-unhover="unselectElement"
  :selectedId="selectedElement"
  :displayPointData="pointsForDisplay" 
  :displayGeojsonData="geoJSONForDisplay" 
  :displayMode="currentMode">
  </time-analysis-map-view>
  <region-count-bar 
  v-on:click-bar="clickListener" 
  v-on:over-bar="selectElement" 
  v-on:out-bar="unselectElement"
  v-if="regionCountBarDisplay" 
  id="global-bar-chart" 
  :selectId="selectedElement" 
  :obj="statisticsData" 
  class='global-bar-chart' >
  </region-count-bar>
  <div 
  class="fixed-normal region-bar-chart"
  :class="{'fixed-silebar-visiable': sidebar.opened}"
  v-if="countryCountBarDisplay">
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import TimeAnalysisMapView from '@/components/MapView/TimeAnalysisMapView'
import regionCountBar from '@/components/Charts/regionCountBar'
import { getRegion, getGeneral, getCountry, getGlobalStatistics, getCountryById } from '@/api/timeAnalysisApi'

export default {
  components: {
    TimeAnalysisMapView,
    regionCountBar
  },
  data () {
    return {
      dateRange: ['20000101', '20010101'],
      geoJSONForDisplay: {},
      pointsForDisplay: {},
      statisticsData: [],
      currentMode: 'global',
      regionCountBarDisplay: true,
      countryCountBarDisplay: false,
      singleCountryChartsDisplay: false,
      detailDisplay: false,
      selectedElement: -1
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    startTime: function () {
      return this.dateRange[0]
    },
    endTime: function () {
      return this.dateRange[1]
    }
  },
  mounted () {
    this.$changeLayout()
    this.initGlobalView()
  },
  methods: {
    initGlobalView () {
      getGeneral({
        format: 'json',
        start: this.startTime,
        end: this.endTime
      })
        .then(response => {
          this.pointsForDisplay = response.data
          console.log(this.pointsForDisplay.features.length)
        })
        .catch(() => {
        })
      getRegion({
        format: 'json'
      })
        .then(response => {
          this.geoJSONForDisplay = response.data
        })
        .catch(() => {
        })
      getGlobalStatistics({
        format: 'json',
        start: this.startTime,
        end: this.endTime
      })
        .then(response => {
          // console.log(response.data)
          this.statisticsData = response.data
        })
        .catch(() => {
        })
    },
    initRegionView (regionId) {
      this.regionCountBarDisplay = false
      this.countryCountBarDisplay = true
      this.singleCountryChartsDisplay = false
      this.detailDisplay = false
      this.currentMode = 'region'
      getGeneral({
        format: 'json',
        start: this.startTime,
        end: this.endTime,
        region: regionId
      }).then(response => {
        this.pointsForDisplay = response.data
        console.log(this.pointsForDisplay.features.length)
      })
      // this.pointsForDisplay.features = this.pointsForDisplay.features.filter(function (feature) {
      //   return feature.properties.country.region === regionId
      // })
      getCountry({
        format: 'json',
        region: regionId
      })
        .then(response => {
          this.geoJSONForDisplay = response.data
        })
        .catch(() => {
        })
    },
    initCountryView (countryId) {
      this.regionCountBarDisplay = false
      this.countryCountBarDisplay = false
      this.singleCountryChartsDisplay = true
      this.detailDisplay = false
      this.currentMode = 'country'
      getGeneral({
        format: 'json',
        start: this.startTime,
        end: this.endTime,
        country: countryId
      }).then(response => {
        this.pointsForDisplay = response.data
      })
      getCountryById({
        format: 'json'
      }, countryId).then(response => {
        this.geoJSONForDisplay = response.data
      })
    },
    getDate () {
      if (this.currentMode === 'global') {
        this.initGlobalView()
      } else if (this.currentMode === 'region') {
        this.initRegionView()
      }
    },
    clickListener (elementId) {
      if (this.currentMode === 'global') {
        this.initRegionView(elementId)
      } else if (this.currentMode === 'region') {
        this.initCountryView(elementId)
      }
    },
    selectElement (id) {
      this.selectedElement = id
    },
    unselectElement (id) {
      this.selectedElement = -1
    }
  }
}
</script>

<style lang="scss" scoped>
.time-analysis-container{
  width: 100%;
  height: 100%;
  display: flex;
  transition: 0.4s all ease-out; 
  flex-direction: column;
  .map-view {
    width: 100%;
    height: 100%;
  }
  .global-bar-chart {
    position: fixed!important;
    right: 0;
    top: 0;
    height: 100%!important;
    width: 40%!important;
    z-index: 999;
    div, canvas {
      width: 100%!important;
    }
  }
  .datepicker-view {
    height: 36px!important;
    width: 350px!important;
    margin: 20px;
    transition: 0.4s all ease-out;
  }
  .region-bar-chart {
    position: initial!important;
    top: initial!important;
    height: 25%!important;
    width: 100%!important;
    background-color: green;
    transition: 0.4s all;
  }
}
.country-map-view {
  height: 75%!important;
}
</style>

