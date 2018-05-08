<template>
  <div>
    <div id="LMapView"></div>
  </div>
</template>

<script>
import L from 'leaflet'

export default {
  name: 'MapView',
  data () {
    return {
      map: null,
      mapContainer: 'LMapView',
      initCenter: [38, 100],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
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
  // width: 100%;
  // height: 100%
}
</style>
