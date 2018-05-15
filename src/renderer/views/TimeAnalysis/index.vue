<template>
<div class='time-analysis-container'>
  <el-date-picker
   v-on:change="getDate"
   v-model="dateRange" 
   type="daterange" 
   value-format="yyyyMMdd" 
   format="yyyy 年 MM 月 dd 日" 
   :unlink-panels="false"
   start-placeholde="起始日期" 
   end-placeholde="结束日期">
   </el-date-picker>
  <time-analysis-map-view 
  class='map-view' 
  v-on:map-region-hover="selectElement" 
  v-on:map-region-click="globalToRegion"
  v-on:map-region-unhover="unselectElement"
  :selectedId="selectedElement"
  :displayPointData="pointsForDisplay" 
  :displayGeojsonData="geoJSONForDisplay" 
  :displayMode="currentMode">
  </time-analysis-map-view>
  <region-count-bar 
  v-on:click-bar="globalToRegion" 
  v-on:over-bar="selectElement" 
  v-on:out-bar="unselectElement"
  v-if="regionCountBarDisplay" 
  id="global-bar-chart" 
  :selectId="selectedElement" 
  :obj="statisticsData" 
  class='global-bar-chart' >
  </region-count-bar>
</div>
</template>

<script>
import TimeAnalysisMapView from '@/components/MapView/TimeAnalysisMapView'
import regionCountBar from '@/components/Charts/regionCountBar'
import Mixin from '../Mixin'
import { getRegion, getGeneral, getCountry, getGlobalStatistics } from '@/api/timeAnalysisApi'

export default {
  components: {
    TimeAnalysisMapView,
    regionCountBar
  },
  mixins: [Mixin],
  data () {
    return {
      dateRange: ['20150101', '20160101'],
      geoJSONForDisplay: {},
      pointsForDisplay: {},
      statisticsData: [],
      currentMode: 'global',
      regionCountBarDisplay: true,
      selectedElement: -1
    }
  },
  computed: {
    startTime: function () {
      return this.dateRange[0]
    },
    endTime: function () {
      return this.dateRange[1]
    }
  },
  created () {
    this.changeLayout()
  },
  mounted () {
    if (this.$route.name) {
      this.$store.dispatch('addVisitedViews', this.$route)
    }
    this.initGlobalView()
  },
  methods: {
    initGlobalView () {
      getGeneral({
        format: 'json',
        start: this.startTime,
        end: this.endTime
      }).then(response => {
        this.pointsForDisplay = response.data
        console.log(this.pointsForDisplay.features.length)
      })
      getRegion({
        format: 'json'
      }).then(response => {
        this.geoJSONForDisplay = response.data
      })
      getGlobalStatistics({
        format: 'json',
        start: this.startTime,
        end: this.endTime
      }).then(response => {
        // console.log(response.data)
        this.statisticsData = response.data
      })
    },
    initRegionView () {

    },
    getDate () {
      this.initGlobalView()
    },
    globalToRegion (regionId) {
      this.regionCountBarDisplay = false
      this.currentMode = 'region'
      this.pointsForDisplay = this.pointsForDisplay.features.filter(function (feature) {
        return feature.properties.country.region === regionId
      })
      getCountry({
        format: 'json',
        region: regionId
      }).then(response => {
        this.geoJSONForDisplay = response.data
      })
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
}
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
.el-range-editor--medium.el-input__inner {
    z-index: 999;
    position: absolute;
    left: 0;
    margin: 20px;
}
</style>

