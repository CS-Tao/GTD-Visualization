<template>
<div class='time-analysis-container' v-on:map-region-click="globalToRegion">
  <el-date-picker v-on:change="getDate" v-model="dateRange" type="daterange" value-format="yyyyMMdd" format="yyyy 年 MM 月 dd 日" start-placeholde="起始日期" end-placeholde="结束日期"></el-date-picker>
  <time-analysis-map-view class='map-view' :displayPointData="pointsForDisplay" :displayGeojsonData="geoJSONForDisplay" :displayMode="currentMode"></time-analysis-map-view>
  <bar v-if="barViewDisplay" class='global-bar-chart' ></bar>
</div>
</template>

<script>
import TimeAnalysisMapView from '@/components/MapView/TimeAnalysisMapView'
import bar from '@/components/Charts/bar'
import { getRegion, getStatistics, getGeneral, getCountry } from '@/api/timeAnalysisApi'

export default {
  components: {
    TimeAnalysisMapView,
    bar
  },
  data () {
    return {
      dateRange: ['20150101', '20160101'],
      geoJSONForDisplay: {},
      pointsForDisplay: {},
      statisticsData: {},
      currentMode: 'global',
      featureCount: 0,
      barViewDisplay: true
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
  mounted () {
    if (this.$route.name) {
      this.$store.dispatch('addVisitedViews', this.$route)
    }
    getGeneral({
      format: 'json',
      start: this.startTime,
      end: this.endTime
    }).then(response => {
      this.pointsForDisplay = response.data
    })
    getRegion({
      format: 'json'
    }).then(response => {
      this.geoJSONForDisplay = response.data
      this.featureCount = this.geoJSONForDisplay.features.length
      console.log(this.featureCount)
    })
    getStatistics({
      format: 'json',
      start: this.startTime,
      end: this.endTime
    }).then(response => {
      this.statisticsData = response.data
    })
  },
  methods: {
    getDate () {
    },
    globalToRegion (regionId) {
      this.currentMode = 'region'
      this.barViewDisplay = false
      getCountry({
        format: 'json',
        region: regionId
      }).then(response => {
        this.geoJSONForDisplay = response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.map-view {
  width: 100%;
  height: 100%;
}
.global-bar-chart {
    position: fixed;
    right: 0;
    z-index: 999;
}
.el-range-editor--medium.el-input__inner {
    z-index: 999;
    position: absolute;
    left: 0;
    margin: 20px;
}
</style>

