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
  data () {
    return {
      map: null,
      mapContainer: 'LMapView',
      initCenter: [38, 100],
      url: 'https://api.mapbox.com/styles/v1/cstao/cjgygxq81001s2sphuk48s4qq/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3N0YW8iLCJhIjoiY2o5ZXl0NWx1MmZ2ejJ3bXFld213cmtmOSJ9.y4UsCMx7WnfSiUbBA-tipg',
      attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 2,
      minZoom: 2,
      maxZoom: 18
    }
  },
  components: {},
  mounted () {
    const map = L.map(this.mapContainer,
      {
        zoomControl: false,
        attributionControl: false
      })
      .setView(this.initCenter, this.zoom)
    L.tileLayer(this.url, {
      attribution: this.attribution,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom
    }).addTo(map)
    this.map = map

    getGeneral({
      year: 2000,
      format: 'json'
    }).then(data => {
      // L.geoJSON(data.data, {
      //   style: function (feature) {
      //     return {color: '#0ff'}
      //   }
      // }).bindPopup(function (layer) {
      //   console.log(JSON.stringify(layer))
      //   return 'layer.feature.properties.description'
      // }).addTo(map)

      for (var i = 0; i < data.data.features.length; i++) {
        if (!data.data.features[i].geometry.coordinates ||
          !data.data.features[i].geometry.coordinates[0] ||
          !data.data.features[i].geometry.coordinates[1]) { continue }

        let lng = data.data.features[i].geometry.coordinates[0]
        let lat = data.data.features[i].geometry.coordinates[1]
        this.addSinglePoint(lng, lat)
      }
      this.$notify.success('绘图完毕')
    })
  },
  methods: {
    addSinglePoint (lng, lat) {
      var point = L.icon({
        iconUrl: 'static/icons/point.png',
        iconSize: [10, 10],
        iconAnchor: [5, 5],
        className: 'single-point-marker' // define in globe styles
      })
      L.marker([lat, lng], {icon: point}).addTo(this.map)
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
