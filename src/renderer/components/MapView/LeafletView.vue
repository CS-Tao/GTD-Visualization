<template>
  <div>
    <div id="LMapView"></div>
  </div>
</template>

<script>
import L from 'leaflet'

export default {
  name: 'MapView',
  props: {
    currentDailyData: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      map: null,
      markerLayerGroup: new L.LayerGroup(),
      mapParams: {
        mapContainer: 'LMapView',
        initCenter: [38, 38],
        url: 'https://api.mapbox.com/styles/v1/cstao/cjgygxq81001s2sphuk48s4qq/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3N0YW8iLCJhIjoiY2o5ZXl0NWx1MmZ2ejJ3bXFld213cmtmOSJ9.y4UsCMx7WnfSiUbBA-tipg',
        attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        zoom: 2,
        minZoom: 2,
        maxZoom: 18
      }
    }
  },
  computed: {
  },
  components: {},
  mounted () {
    const map = L.map(this.mapParams.mapContainer,
      {
        zoomControl: false,
        attributionControl: false
      })
      .setView(this.mapParams.initCenter, this.mapParams.zoom)
    L.tileLayer(this.mapParams.url, {
      attribution: this.mapParams.attribution,
      minZoom: this.mapParams.minZoom,
      maxZoom: this.mapParams.maxZoom
    }).addTo(map)
    this.map = map
    this.map.addLayer(this.markerLayerGroup)
  },
  watch: {
    currentDailyData () {
      this.markerLayerGroup.clearLayers()
      this.currentDailyData.forEach(item => {
        if (!item.geometry.coordinates ||
          !item.geometry.coordinates[0] ||
          !item.geometry.coordinates[1]) { return }

        let lng = item.geometry.coordinates[0]
        let lat = item.geometry.coordinates[1]
        this.addSinglePoint(this.markerLayerGroup, lng, lat)
      })
    }
  },
  methods: {
    addSinglePoint (layerGroup, lng, lat) {
      var point = L.icon({
        iconUrl: 'static/icons/point_red.png',
        iconSize: [10, 10],
        iconAnchor: [5, 5],
        className: 'single-point-marker' // define in globe styles
      })
      layerGroup.addLayer(L.marker([lat, lng], {icon: point}))
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("../../../../node_modules/leaflet/dist/leaflet.css");
#LMapView {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #191a1a;
}
</style>
