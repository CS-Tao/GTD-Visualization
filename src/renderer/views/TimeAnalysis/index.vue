<template>
<div class='time-analysis-container' v-loading="loading" element-loading-text="数据加载中...">
  <div 
  class="fixed-normal datepicker-view"
  :class="{'fixed-silebar-visiable': sidebar.opened}">
  <el-button icon="el-icon-menu" circle style="background: transparent" v-on:click="backToHome"></el-button>
  <el-date-picker 
   v-on:change="getDate"
   v-model="dateRange" 
   type="daterange" 
   value-format="yyyyMMdd" 
   format="yyyy / MM / dd" 
   :disabled="!regionCountBarDisplay"
   :unlink-panels="true"
   start-placeholde="Start Date" 
   end-placeholde="End Date">
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
  <transition name="right">
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
  </transition>
  <transition name="bottom">
  <country-scatter
  class="fixed-normal region-bar-chart"
  :class="{'fixed-silebar-visiable': sidebar.opened}"
  v-if="countryScatterDisplay"
  id="country-scatter"
  :startString="startTime"
  :endString="endTime"
  :obj="pointsForDisplay"
  :selectId="selectedElement"
  :countryNameList="countryList">
  </country-scatter>
  </transition>
  <transition name="right">
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
  </transition>
  <transition name="left">
  <el-card 
  class="fixed-normal country-statistics-card"
  :class="{'fixed-silebar-visiable': sidebar.opened}"
  v-if=singleCountryChartsDisplay>
  <div slot="header" 
  class="card-header" >
    <span>Loss Summary</span>
  </div>
  <div class="card-item-name">Victims:</div>
  <div class="card-item-num">{{lossData.kill}}</div>
  <div class="card-item-name">Woundeds:</div>
  <div class="card-item-num">{{lossData.wound}}</div>
  <div class="card-item-name">Economic losses:</div>
  <div class="card-item-num">$ {{lossData.prop}}</div>
  </el-card>
  </transition>
  <transition name="up">
  <el-card 
  class="detail-card"
  v-if=detailDisplay>
  <div slot="header" 
  class="card-header" >
    <span>Attack Record</span>
  </div>
  <div class="card-item-name">Time</div>
  <div class="card-item-str">{{detailData.time}}</div>
  <div class="card-item-name">Place</div>
  <div class="card-item-str">{{detailData.place}}</div>
  <div class="card-item-name">Group</div>
  <div class="card-item-str">{{detailData.group}}</div>
  <div class="card-item-name">Attack type</div>
  <div class="card-item-str">{{detailData.attack}}</div>
  <div class="card-item-name">Attack target</div>
  <div class="card-item-str">{{detailData.target}}</div>
  <div class="card-item-name">Weapon type</div>
  <div class="card-item-str">{{detailData.weapon}}</div>
  <div class="card-item-name">Victims/Woundeds</div>
  <div class="card-item-str">{{detailData.victims}} / {{detailData.woundeds}}</div>
  <div class="card-item-name">Incident report</div>
  <div class="card-item-text">{{detailData.summary}}</div>
  <div class="card-item-name">Loss details</div>
  <div class="card-item-text">{{detailData.prop}}</div>
  </el-card>
  </transition>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import TimeAnalysisMapView from '@/components/MapView/TimeAnalysisMapView'
import regionCountBar from '@/components/Charts/regionCountBar'
import countryScatter from '@/components/Charts/countryScatter'
import country3ModelRadar from '@/components/Charts/country3ModelRadar'
import { getRegion, getGeneral2, getCountry, getGlobalStatistics, getCountryById, getStatistics, getEventById } from '@/api/timeAnalysisApi'

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
      lossData: {kill: 0, wound: 0, prop: 0},
      loading: true,
      countryList: [],
      displayMode: 'global',
      detailData: {
        time: '2010-10-20',
        place: 'Ankara, Turkey',
        group: 'unknown',
        attack: 'unknown',
        target: 'unknown',
        weapon: 'unknown',
        victims: 0,
        woundeds: 0,
        summary: 'No record.',
        prop: 'No record.'
      }
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
      if (this.displayMode === 'global') {
        return true
      } else {
        return false
      }
    },
    countryScatterDisplay: function () {
      if (this.displayMode === 'region') {
        return true
      } else {
        return false
      }
    },
    singleCountryChartsDisplay: function () {
      if (this.displayMode === 'country') {
        return true
      } else {
        return false
      }
    },
    detailDisplay: function () {
      if (this.displayMode === 'detail') {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.$changeLayout()
    this.initGlobalView()
  },
  methods: {
    initGlobalView () {
      getGeneral2({
        format: 'json',
        start: this.startTime,
        end: this.endTime
      })
        .then(response => {
          this.pointsForDisplay = response.data
          if (this.loading) {
            this.loading = false
          }
        })
        .catch(() => {
          if (this.loading) {
            this.loading = false
          }
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
      // console.log(this.pointsForDisplay.features.length)
      // const tmp = this.pointsForDisplay.features.filter(feature => {
      //   return feature.properties.country.region === regionId
      // })
      // console.log(tmp.length)
      // this.$set(this.pointsForDisplay, 'features', tmp)
      getGeneral2({
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
      }).then(response => {
        this.geoJSONForDisplay = response.data
        let countries = []
        for (var i = 0; i < response.data.features.length; i++) {
          countries.push({
            id: response.data.features[i].id,
            name: response.data.features[i].properties.countryName
          })
        }
        this.selectedElement = countries[0].id
        this.countryList = countries
        this.displayMode = 'region'
      }).catch(() => {
      })
    },
    initCountryView (countryId) {
      this.statisticsData = {}
      this.currentMode = 'country'
      this.displayMode = 'country'
      // console.log(this.pointsForDisplay.features.length)
      // const tmp = this.pointsForDisplay.features.filter(feature => {
      //   return feature.properties.country.region === countryId
      // })
      // console.log(tmp.length)
      // this.$set(this.pointsForDisplay, 'features', tmp)
      getGeneral2({
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
    initDetailView (eventId) {
      getEventById(eventId, {
        format: 'json'
      }).then(response => {
        this.currentMode = 'detail'
        this.displayMode = 'detail'
        this.pointsForDisplay = response.data
        const detail = response.data.properties
        if (detail.data !== null) {
          this.detailData.time = detail.date
        } else {
          this.detailData.time = detail.year + ''
        }
        if (detail.city !== null && detail.city !== '') {
          this.detailData.place = detail.city + ', ' + detail.country.countryName
        } else {
          this.detailData.place = detail.country.countryName
        }
        if (detail.groupName !== null && detail.groupName !== '' && detail.groupName !== ' ') {
          this.detailData.group = detail.groupName
        }
        if (detail.attackType !== null) {
          this.detailData.attack = detail.attackType.attackTypeName
        }
        if (detail.targetType !== null) {
          this.detailData.target = detail.targetType.targetTypeName
        }
        if (detail.weaponType !== null) {
          this.detailData.weapon = detail.weaponType.weaponTypeName
        }
        if (detail.numKill !== null) {
          this.detailData.victims = detail.numKill
        }
        if (detail.numWound !== null) {
          this.detailData.woundeds = detail.numWound
        }
        if (detail.summary !== null && detail.summary !== '' && detail.summary !== ' ') {
          this.detailData.summary = detail.summary
        }
        if (detail.propComment !== null && detail.propComment !== '' && detail.propComment !== ' ') {
          this.detailData.prop = detail.propComment
        }
      })
    },
    getDate () {
      if (this.currentMode === 'global') {
        this.initGlobalView()
      } else if (this.currentMode === 'region') {
        this.initRegionView()
      } else if (this.currentMode === 'country') {
        this.initCountryView()
      }
    },
    clickListener (elementId) {
      if (this.currentMode === 'global') {
        this.initRegionView(elementId)
      } else if (this.currentMode === 'region') {
        this.initCountryView(elementId)
      } else if (this.currentMode === 'country') {
        this.initDetailView(elementId)
      }
    },
    selectElement (id) {
      this.selectedElement = id
    },
    unselectElement (id) {
      this.selectedElement = -1
    },
    backToHome () {
      this.currentMode = 'global'
      this.displayMode = 'global'
      this.loading = true
      this.initGlobalView()
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
    right: -3vw;
    top: 0;
    height: 100%!important;
    width: 50%!important;
    z-index: 400;
    div, canvas {
      width: 100%!important;
    }
  }
  .datepicker-view {
    height: 36px!important;
    width: 450px!important;
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
    background: rgba(0,0,0,0.2)!important;
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
    border-radius: 10px;
    .card-header {
      font-family: Arial, Helvetica, sans-serif!important;
      font-size: 25px;
      color: orange;
      text-align: left;
      font-weight: 700;
    }
    .card-item-name{
      color: orangered;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 700;
      font-size: 25px;
      margin-top: 35px;
      margin-bottom: 35px;
    }
    .card-item-num{
      color: orange;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 700;
      font-size: 25px;
      margin-top: 30px;
      margin-bottom: 30px;
      text-align: right;
    }
  }
  .detail-card{
    top: 10vh!important;
    right: 0px;
    margin-right: 50px;
    background-color: transparent;
    width: 350px!important;
    height: 86%!important;
    border-color: orange;
    border-width: 0px!important;
    box-shadow: 0 0 20px orange!important;
    position: fixed;
    z-index: 999;
    border-radius: 10px;
    .card-header {
      font-family: 'STXihei'!important;
      font-size: 25px;
      color: orange;
      text-align: left;
      font-weight: 700;
    }
    .card-item-name{
      color: orange;
      font-family: Helvetica;
      font-size: 25px;
      margin-top: 2px;
      margin-bottom: 2px;
    }
    .card-item-str{
      color: orangered;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 20px;
      margin-top: 2px;
      margin-bottom: 2px;
      text-align: right;
    }
    .card-item-text{
      color: orangered;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 15px;
      margin-top: 2px;
      margin-bottom: 2px;
      text-align: left;
    }
  }
}
.right-enter-active, .right-leave-active {
  transition: 0.5s transform ease 0s!important;
}
.right-enter, .right-leave-to {
  transform: translateX(30vw)!important;
}
.left-enter-active, .left-leave-active {
  transition: 0.5s transform ease 0s!important;
}
.left-enter, .left-leave-to {
  transform: translateX(-30vw)!important;
}
.up-enter-active {
  transition: 0.5s transform ease 0s!important;
}
.up-leave-active {
  transition: 0.5s transform ease 0s!important;
}
.up-enter, .up-leave-to {
  transform: translateY(-100vh)!important;
}
.bottom-enter-active, .bottmo-leave-active {
  transition: 0.5s transform ease 0s!important;
}
.bottom-enter, .bottom-leave-to {
  transform: translateY(20vh)!important;
}
</style>

