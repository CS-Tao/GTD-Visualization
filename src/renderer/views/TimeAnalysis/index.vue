<template>
<div class='time-analysis-container'>
  <div 
  class="fixed-normal datepicker-view"
   :class="{'fixed-silebar-visiable': sidebar.opened}">
  <el-button icon="el-icon-menu" circle></el-button>
  <el-date-picker 
   v-on:change="getDate"
   v-model="dateRange" 
   type="daterange" 
   value-format="yyyyMMdd" 
   format="yyyy 年 MM 月 dd 日" 
   :unlink-panels="true"
   start-placeholde="起始日期" 
   end-placeholde="结束日期">
   </el-date-picker>
  </div>
  <time-analysis-map-view
  class="map-view"
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
  id="global-bar-chart" 
  v-if="regionCountBarDisplay"
  :selectId="selectedElement" 
  :obj="statisticsData" 
  class='global-bar-chart' >
  </region-count-bar>
  <country-scatter
  class="fixed-normal region-bar-chart"
  :class="{'fixed-silebar-visiable': sidebar.opened}"
  v-if="countryScatterDisplay"
  id="country-scatter">
  </country-scatter>
  <div class="radar-charts-container" v-if="singleCountryChartsDisplay">
  <country3-model-radar
  id="attack-radar"
  class="attack-radar-char-view"
  :obj="statisticsData"
  model="attack">
  </country3-model-radar>
  <country3-model-radar
  id="target-radar"
  class="target-radar-char-view"
  :obj="statisticsData"
  model="target">
  </country3-model-radar>
  <country3-model-radar
  id="weapon-radar"
  class="weapon-radar-char-view"
  :obj="statisticsData"
  model="weapon">
  </country3-model-radar>
  </div>
  <el-card 
  class="fixed-normal country-statistics-card"
  :class="{'fixed-silebar-visiable': sidebar.opened}"
  v-if=singleCountryChartsDisplay>
  <div slot="header" 
  class="card-header" >
    <span>损失情况</span>
  </div>
  <div class="card-item-name">死亡</div>
  <div class="card-item-num">{{lossData.kill}} 人</div>
  <div class="card-item-name">受伤</div>
  <div class="card-item-num">{{lossData.wound}} 人</div>
  <div class="card-item-name">造成经济损失</div>
  <div class="card-item-num">{{lossData.prop}} 美元</div>
  </el-card>
</div>
</template>

<script>
// :start="startTime"
//   :end="endTime"
//   :obj="pointsForDisplay"
//   :selectId="selectedElement"
//   :countryNameList="countryList">
import { mapGetters } from 'vuex'
import TimeAnalysisMapView from '@/components/MapView/TimeAnalysisMapView'
import regionCountBar from '@/components/Charts/regionCountBar'
import countryScatter from '@/components/Charts/countryScatter'
import country3ModelRadar from '@/components/Charts/country3ModelRadar'
import { getRegion, getGeneral, getCountry, getGlobalStatistics, getCountryById, getStatistics } from '@/api/timeAnalysisApi'

export default {
  components: {
    TimeAnalysisMapView,
    regionCountBar,
    countryScatter,
    country3ModelRadar
  },
  data () {
    return {
      dateRange: ['20000101', '20010101'],
      geoJSONForDisplay: {},
      pointsForDisplay: {},
      statisticsData: [],
      currentMode: 'global',
      selectedElement: -1,
      lossData: {kill: 0, wound: 0, prop: 0}
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
    },
    regionCountBarDisplay: function () {
      if (this.currentMode === 'global') {
        return true
      } else {
        return false
      }
    },
    countryScatterDisplay: function () {
      if (this.currentMode === 'region') {
        return true
      } else {
        return false
      }
    },
    singleCountryChartsDisplay: function () {
      if (this.currentMode === 'country') {
        return true
      } else {
        return false
      }
    },
    detailDisplay: function () {
      if (this.currentMode === 'detail') {
        return true
      } else {
        return false
      }
    },
    countryList: function () {
      let countries = []
      if (this.currentMode === 'region') {
        this.geoJSONForDisplay.features.foreach(function (feature) {
          let cid = feature.id
          let cname = feature.properties.countryName
          countries.push({
            id: cid,
            name: cname
          })
        })
        return countries
      } else {
        return []
      }
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
          this.statisticsData = response.data
        })
        .catch(() => {
        })
    },
    initRegionView (regionId) {
      this.currentMode = 'region'
      getGeneral({
        format: 'json',
        start: this.startTime,
        end: this.endTime,
        region: regionId
      }).then(response => {
        this.pointsForDisplay = response.data
      }).catch(() => {
      })
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
      this.statisticsData = {}
      this.currentMode = 'country'
      getGeneral({
        format: 'json',
        start: this.startTime,
        end: this.endTime,
        country: countryId
      }).then(response => {
        this.pointsForDisplay = response.data
      }).catch(() => {
      })
      getCountryById(countryId, {
        format: 'json'
      }).then(response => {
        this.geoJSONForDisplay = response.data
      }).catch(() => {
      })
      getStatistics({
        format: 'json',
        startTime: this.startTime,
        endTime: this.endTime,
        country: countryId
      }).then(response => {
        console.log(response.data)
        this.statisticsData = response.data
        if (response.data.kill !== null) {
          this.lossData.kill = response.data.kill
        }
        if (response.data.wound !== null) {
          this.lossData.wound = response.data.wound
        }
        if (response.data.prop !== null) {
          this.lossData.prop = response.data.prop
        }
      }).catch(() => {
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
      console.log(this.currentMode)
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
  // flex-direction: column;
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
    background-color: transparent;
    border-width: 1px;
  }
  .region-bar-chart {
    position: fix!important;
    top: initial!important;
    bottom: 0!important;
    height: 25%!important;
    width: 100%!important;
    transition: 0.4s all;
  }
  .radar-charts-container{
    display: flex;
    flex-direction: column;
    position: fixed!important;
    right: 0;
    top: 7vh;
    height: 93vh!important;
    width: 25%!important;
    z-index: 999;
    .attack-radar-char-view, .target-radar-char-view, .weapon-radar-char-view {
      width: 100%!important;
      height: 33%!important;
      background-color: rgba(0, 0, 0, 0)!important;
    }
    .attack-radar-char-view {
      height: 34%!important;
    }
  }
  .country-statistics-card {
    top: 25vh!important;
    margin-left: 20px;
    background-color: transparent;
    width: 350px!important;
    height: 60%!important;
    border-color: orange;
    border-width: 0px!important;
    box-shadow: 0 0 20px orange!important;
    .card-header {
      font-family: 'STXihei'!important;
      font-size: 25px;
      color: orange;
      text-align: left;
      font-weight: 700;
    }
    .card-item-name{
      color: orangered;
      font-family: 'SimHei';
      font-weight: 700;
      font-size: 25px;
      margin-top: 30px;
      margin-bottom: 30px;
    }
    .card-item-num{
      color: orange;
      font-family: 'SimHei';
      font-weight: 700;
      font-size: 25px;
      margin-top: 30px;
      margin-bottom: 30px;
      text-align: right;
    }
  }
}
</style>

