<template>
  <div :id="mapId" class="leaft-map-view"></div>
</template>

<script>
import L from 'leaflet'

export default {
  name: 'MapView',
  props: {
    mapId: {
      type: String,
      required: true
    },
    currentDailyData: {
      type: Array,
      default: () => {
        return []
      }
    },
    zoom: {
      type: Number,
      default: 3
    },
    lng: {
      type: Number,
      default: 38
    },
    lat: {
      type: Number,
      default: 38
    }
  },
  data () {
    return {
      map: null,
      markerLayerGroup: new L.LayerGroup(),
      mapParams: {
        url: 'https://api.mapbox.com/styles/v1/hideinme/cjbd5v7f18sxz2rmxt2ewnqtt/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGlkZWlubWUiLCJhIjoiY2o4MXB3eWpvNnEzZzJ3cnI4Z3hzZjFzdSJ9.FIWmaUbuuwT2Jl3OcBx1aQ',
        attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 1,
        maxZoom: 18
      }
    }
  },
  components: {},
  mounted () {
    const map = L.map(this.mapId,
      {
        zoomControl: false,
        attributionControl: false
      })
      .setView([this.lng, this.lat], this.zoom)
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("../../../../node_modules/leaflet/dist/leaflet.css");
.leaft-map-view {
  width: 100%;
  height: 100%;
  background-color: black;
}
</style>
