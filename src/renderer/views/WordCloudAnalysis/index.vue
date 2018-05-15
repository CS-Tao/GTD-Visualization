<template>
  <div class="wrap">
    <leaflet-view
    mapId="wordcloud-leaflet-map"
    :zoom="mapZoom" class="map-view">
    </leaflet-view>
    <div class="fixed-normal wordcloud-events-view" 
    :class="{'fixed-silebar-visiable': sidebar.opened}">
      <word-cloud
       v-loading="wordcloudDataLoading"
       element-loading-text="词云加载中..."
      :data="wordcloudData"
      @item-clicked="showEventInfoList"
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
      class="events-view"
      :class="{'events-view-hide': eventViewHide}">
        <el-table-column
          prop="id"
          label="城市">
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
      mapZoom: 2,
      wordcloudData: [],
      eventsInfoList: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    eventViewHide () {
      return this.eventsInfoList.length === 0
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
      this.$notify.success('showEventInfoList: ' + keyword)
      getTdInfo({
        format: 'json',
        keyword: keyword
      })
        .then((response) => {
          this.eventsInfoList = response.data.features
          this.eventsInfoLoading = false
        })
        .catch(() => {
          this.eventsInfoLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  // display: flex;
  .map-view {
    position: relative!important;
    top: 0px;
    left: 0px;
    // flex: 2;
    // margin: 0;
    width: 100%;
    height: 100%;
  }
  .wordcloud-events-view {
    transition: all .3s cubic-bezier(.55, 0, .1, 1);
    background: rgba(255,255,255,.1);
    display: flex;
    .wordcloud-view {
      flex: 1;
    }
    .events-view {
      flex: 1.5;
      background: rgba(255,255,255,0);
    }
    .events-view-hide {
      display: none;
      background: rgba(255,255,255,0);
    }
  }
}
</style>
