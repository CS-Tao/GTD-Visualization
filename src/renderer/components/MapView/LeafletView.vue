<template>
  <div>
    <div id="LMapView"></div>
  </div>
</template>

<script>
import L from 'leaflet'
import { getGeneral } from '@/api/dashboardApi'

export default {
  name: 'MapView',
  props: {
    // geojsonData: {
    //   type: Object,
    //   default: {}
    // }
  },
  data () {
    return {
      map: null,
      markerLayerGroup: new L.LayerGroup(),
      mapParams: {
        mapContainer: 'LMapView',
        initCenter: [38, 100],
        url: 'https://api.mapbox.com/styles/v1/cstao/cjgygxq81001s2sphuk48s4qq/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3N0YW8iLCJhIjoiY2o5ZXl0NWx1MmZ2ejJ3bXFld213cmtmOSJ9.y4UsCMx7WnfSiUbBA-tipg',
        attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        zoom: 2,
        minZoom: 2,
        maxZoom: 18
      },
      geojsonData: {},
      currentDay: 1
    }
  },
  computed: {
    totalDays () {
      return this.geojsonData.features.length
    },
    currentDailyData () {
      return this.geojsonData.features.filter(item => {
        return item.properties.month === this.currentDay
      })
    }
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

    getGeneral({
      year: 2000,
      format: 'json'
    }).then(data => {
      this.geojsonData = data.data
      this.startTimer()
    })
  },
  methods: {
    addSinglePoint (layerGroup, lng, lat) {
      var point = L.icon({
        iconUrl: 'static/icons/point.png',
        iconSize: [10, 10],
        iconAnchor: [5, 5],
        className: 'single-point-marker' // define in globe styles
      })
      layerGroup.addLayer(L.marker([lat, lng], {icon: point}))
    },
    addDailyData () {
      this.markerLayerGroup.clearLayers()
      this.currentDailyData.forEach(item => {
        if (!item.geometry.coordinates ||
          !item.geometry.coordinates[0] ||
          !item.geometry.coordinates[1]) { return }

        let lng = item.geometry.coordinates[0]
        let lat = item.geometry.coordinates[1]
        this.addSinglePoint(this.markerLayerGroup, lng, lat)
      })
      this.currentDay = this.currentDay % 12 + 1
      // console.log(this.currentDailyData)
      // console.log(this.currentDay)
    },
    startTimer () {
      setInterval(this.addDailyData, 1000)
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
