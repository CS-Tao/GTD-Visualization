<template>
  <div id="LMapView"></div>
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
        url: 'https://api.mapbox.com/styles/v1/hideinme/cjbd5v7f18sxz2rmxt2ewnqtt/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGlkZWlubWUiLCJhIjoiY2o4MXB3eWpvNnEzZzJ3cnI4Z3hzZjFzdSJ9.FIWmaUbuuwT2Jl3OcBx1aQ',
        attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        zoom: 2,
        minZoom: 1,
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
      // add new point layers to layer group
      var that = this
      // console.log(this.currentDailyData.length)
      this.currentDailyData.forEach(item => {
        if (!item.geometry.coordinates ||
          !item.geometry.coordinates[0] ||
          !item.geometry.coordinates[1]) { return }

        let lng = item.geometry.coordinates[0]
        let lat = item.geometry.coordinates[1]
        that.addSinglePoint(that.markerLayerGroup, lng, lat)
      })
      // remove point layers running out life time
      // console.log(this.markerLayerGroup.getLayers().length)
      let deadLayers = []
      this.markerLayerGroup.eachLayer(function (layer) {
        layer.lifetime -= 1
        if (layer.lifetime === 0) {
          deadLayers.push(layer)
        }
      })
      // console.log(deadLayers.length)
      deadLayers.forEach(function (value, index, array) {
        that.markerLayerGroup.removeLayer(value)
      })
    }
  },
  methods: {
    addSinglePoint (layerGroup, lng, lat) {
      var ringOptions = {
        radius: 10,
        stroke: true,
        color: '#E66417',
        weight: 2,
        opacity: 1,
        fill: false,
        render: L.svg(),
        className: 'main-firstring-marker'
      }
      var firstRingLayer = L.circleMarker([lat, lng], ringOptions)
      ringOptions.className = 'main-secondring-marker'
      var secondRingLayer = L.circleMarker([lat, lng], ringOptions)
      // display days
      firstRingLayer.lifetime = 10
      secondRingLayer.lifetime = 10
      layerGroup.addLayer(firstRingLayer)
      layerGroup.addLayer(secondRingLayer)

      var pointOptions = {
        radius: 5,
        stroke: false,
        color: '#E65217',
        weight: 1,
        opacity: 1,
        fill: true,
        fillOpacity: 1,
        render: L.svg(),
        className: 'main-point-marker'
      }
      var pointLayer = L.circleMarker([lat, lng], pointOptions)
      pointLayer.lifetime = 10
      layerGroup.addLayer(pointLayer)

      // var point = L.icon({
      //   iconUrl: 'static/icons/point.png',
      //   iconSize: [10, 10],
      //   iconAnchor: [5, 5],
      //   className: 'single-point-marker' // define in globe styles
      // })
      // var pointLayer = L.marker([lat, lng], {icon: point})
      // pointLayer.lifetime = 10
      // layerGroup.addLayer(pointLayer)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("../../../../node_modules/leaflet/dist/leaflet.css");
#LMapView {
  // position: absolute;
  // top: 0;
  // bottom: 0;
  // left: 0;
  // right: 0;
  width: 100%;
  height: 100%;
  background-color: black;
}
</style>
