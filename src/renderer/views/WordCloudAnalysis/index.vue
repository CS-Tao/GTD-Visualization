<template>
  <div class="wrap">
    <leaflet-view
    mapId="wordcloud-leaflet-map"
    mode="static-dynamic"
    :staticMarkerPosition="staticMarkerLocation"
    :dynamicMarkerPosition="dynamicMarkerLocation"
    :zoom="mapZoom"
    :lng="mapCenterLng"
    :lat="mapCenterLat"
    url="https://api.mapbox.com/styles/v1/hideinme/cjhaowf2w176k2sr3qw1l0l8n/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGlkZWlubWUiLCJhIjoiY2o4MXB3eWpvNnEzZzJ3cnI4Z3hzZjFzdSJ9.FIWmaUbuuwT2Jl3OcBx1aQ">
    </leaflet-view>
    <div class="fixed-normal wordcloud-events-view"
    :class="{'fixed-silebar-visiable': sidebar.opened}">
      <word-cloud
       v-loading="wordcloudDataLoading"
       element-loading-text="Loading wordcloud..."
      :data="wordcloudData"
      @item-clicked="showEventInfoList"
      @blank-clicked="clearEventInfoList"
      nameKey="word"
      valueKey="frequency"
      class="wordcloud-view">
      </word-cloud>
      <el-table
      v-loading="eventsInfoLoading"
      element-loading-text="Loading event details..."
      border
      height="100%"
      :data="eventsInfoList"
      highlight-current-row
      @current-change="eventSelectChanged"
      @cell-mouse-enter="eventMouseOverChanged"
      class="events-view"
      :class="{'events-view-hide': eventViewHide}">
        <el-table-column
          prop="summary"
          :label="eventsViewerTitle">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ScrollBar from '@/components/Layout/SidebarComponents/ScrollBar'
import LeafletView from '@/components/MapView/LeafletView'
import WordCloud from '@/components/WordCloud'
import { getWordcloudData, getTdInfo } from '@/api/wordCloudAnalysisApi'

export default {
  name: 'WordCloudAnalysis',
  components: {
    ScrollBar,
    LeafletView,
    WordCloud
  },
  data () {
    return {
      wordcloudDataLoading: false,
      eventsInfoLoading: false,
      wordcouldFontSize: [10, 80],
      wordcloudData: [],
      eventsViewerTitle: 'Event Information',
      eventsInfoList: [],
      mapCenterLng: 38,
      mapCenterLat: 38,
      mapZoom: 2,
      staticMarkerLocation: {},
      dynamicMarkerLocation: {}
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    eventViewHide () {
      return this.eventsInfoList.length === 0 && !this.eventsInfoLoading
    }
  },
  mounted () {
    this.$changeLayout()
    this.wordcloudDataLoading = true
    getWordcloudData({
      format: 'json',
      limit: 150
    })
      .then((response) => {
        this.wordcloudData = response.data
        this.wordcloudDataLoading = false
      })
      .catch(() => {
        this.wordcloudDataLoading = false
      })
  },
  methods: {
    showEventInfoList (keyword) {
      this.eventsInfoLoading = true
      this.eventsViewerTitle = 'Event Information - Keyword: ' + keyword
      getTdInfo({
        format: 'json',
        keyword: keyword
      })
        .then((response) => {
          this.eventsInfoList = []
          response.data.features.forEach(item => {
            this.eventsInfoList.push({
              id: item.id,
              lng: item.geometry.coordinates[0],
              lat: item.geometry.coordinates[1],
              year: item.properties.year,
              month: item.properties.month,
              day: item.properties.day,
              date: item.properties.date,
              city: item.properties.city,
              summary: item.properties.summary,
              country: item.properties.country.countryName
            })
          })
          this.eventsInfoLoading = false
          this.$notify({
            type: 'success',
            message: 'Loading information succeeds.',
            offset: 50
          })
        })
        .catch(() => {
          this.eventsInfoLoading = false
        })
    },
    clearEventInfoList () {
      this.mapCenterLng = 38
      this.mapCenterLat = 38
      this.mapZoom = 2
      if (this.eventsInfoList.length !== 0) {
        this.eventsInfoList = []
      }
      if (this.staticMarkerLocation !== {}) {
        this.staticMarkerLocation = {}
      }
      if (this.dynamicMarkerLocation !== {}) {
        this.dynamicMarkerLocation = {}
      }
    },
    eventSelectChanged (val) {
      if (!val) { return }
      this.mapZoom = 5
      this.staticMarkerLocation = {
        lng: val.lng,
        lat: val.lat
      }
      this.$notify({
        message: this.$createElement('div', {style: 'color: #eee'}, 'Location：' + val.city + val.country),
        offset: 50
      })
    },
    eventMouseOverChanged (val) {
      this.dynamicMarkerLocation = {
        lng: val.lng,
        lat: val.lat
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  .wordcloud-events-view {
    transition: all .3s cubic-bezier(.55, 0, .1, 1);
    background: rgba(255,255,255,.1);
    display: flex;
    .wordcloud-view {
      flex: 1;
      transition: all .3s cubic-bezier(.55, 0, .1, 1);
    }
    .events-view {
      flex: 1.5;
      background: rgba(255,255,255,0);
      transition: all .3s cubic-bezier(.55, 0, .1, 1);
      border-radius: 10px;
      margin-right: 10px!important;
      margin-top: 5px!important;
    }
    .events-view-hide {
      display: none;
      background: rgba(255,255,255,0);
      transition: all .3s cubic-bezier(.55, 0, .1, 1);
    }
  }
}
</style>
