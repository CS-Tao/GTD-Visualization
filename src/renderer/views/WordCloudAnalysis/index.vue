<template>
  <div class="wrap">
    <leaflet-view mapId="wordcloud-leaflet-map" :zoom="mapZoom" class="map-view" v-blur="blurConfig"></leaflet-view>
    <word-cloud :data="wordcloudData" class="fixed-normal wordcloud-view" :class="{'fixed-silebar-visiable': sidebar.opened}"></word-cloud>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Mixin from '../Mixin'
import LeafletView from '@/components/MapView/LeafletView'
import WordCloud from '@/components/WordCloud'

export default {
  name: 'WordCloudAnalysis',
  mixins: [Mixin],
  components: {
    LeafletView,
    WordCloud
  },
  data () {
    return {
      mapZoom: 2,
      blurConfig: {
        isBlurred: true,
        opacity: 0.9,
        filter: 'blur(1.2px)',
        transition: 'all .3s linear'
      },
      wordcloudData: [{
        'name': 'Cat',
        'value': 26
      },
      {
        'name': 'fish',
        'value': 19
      },
      {
        'name': 'things',
        'value': 18
      },
      {
        'name': 'look',
        'value': 16
      },
      {
        'name': 'two',
        'value': 15
      },
      {
        'name': 'fun',
        'value': 9
      },
      {
        'name': 'know',
        'value': 9
      },
      {
        'name': 'good',
        'value': 9
      },
      {
        'name': 'play',
        'value': 6
      }]
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  created () {
    this.changeLayout()
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
  .wordcloud-view {
    transition: all 0.4s;
  }
}
</style>
