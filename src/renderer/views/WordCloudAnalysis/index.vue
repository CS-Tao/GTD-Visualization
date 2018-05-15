<template>
  <div class="wrap">
    <leaflet-view
    mapId="wordcloud-leaflet-map"
    mode="static-dynamic"
    :staticMarkerPosition="staticMarkerLocation"
    :dynamicMarkerPosition="dynamicMarkerLocation"
    :zoom="mapZoom" class="map-view">
    </leaflet-view>
    <div class="fixed-normal wordcloud-events-view" 
    :class="{'fixed-silebar-visiable': sidebar.opened}">
      <word-cloud
       v-loading="wordcloudDataLoading"
       element-loading-text="词云加载中..."
      :data="wordcloudData"
      @item-clicked="showEventInfoList"
      @blank-clicked="clearEventInfoList"
      nameKey="word"
      valueKey="frequency"
      class="wordcloud-view">
      </word-cloud>
      <el-table
      v-loading="eventsInfoLoading"
      element-loading-text="事件详情加载中..."
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
import Mixin from '../Mixin'
import ScrollBar from '@/components/Layout/SidebarComponents/ScrollBar'
import LeafletView from '@/components/MapView/LeafletView'
import WordCloud from '@/components/WordCloud'
import { getWordcloudData, getTdInfo } from '@/api/wordCloudAnalysisApi'

export default {
  name: 'WordCloudAnalysis',
  mixins: [Mixin],
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
      eventsViewerTitle: '事件信息',
      eventsInfoList: [],
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
  created () {
    this.changeLayout()
  },
  mounted () {
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
      getTdInfo({
        format: 'json',
        keyword: keyword
      })
        .then((response) => {
          // this.eventsInfoList = response.data.features
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
          this.eventsViewerTitle = '事件信息 - 关键词: ' + keyword
          this.eventsInfoLoading = false
          this.$notify.success('事件信息读取成功')
        })
        .catch(() => {
          this.eventsInfoLoading = false
        })
    },
    clearEventInfoList () {
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
      this.staticMarkerLocation = {
        lng: val.lng,
        lat: val.lat
      }
      this.$notify({
        message: this.$createElement('div', {style: 'color: #E66417'}, JSON.stringify(this.staticMarkerLocation))
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
  .map-view {
    position: relative!important;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
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
    }
    .events-view-hide {
      display: none;
      background: rgba(255,255,255,0);
      transition: all .3s cubic-bezier(.55, 0, .1, 1);
    }
  }
}
</style>
