<template>
  <div>
    <div id="MapView"></div>
  </div>
</template>

<script>
// import L from 'leaflet'
import mapboxgl from 'mapbox-gl'

export default {
  name: 'MapView',
  props: {
    displayGeojsonData: {
      type: Object,
      default: {}
    },
    // global/region/country
    displayMode: {
      type: String,
      default: 'global'
    },
    displayPointData: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      map: null,
      mapParams: {
        container: 'MapView',
        center: [38, 38],
        style: 'mapbox://styles/hideinme/cjbd5v7f18sxz2rmxt2ewnqtt',
        zoom: 3
        // attributionControl: false,
        // dragRotate: false,
        // minZoom: 3,
        // maxZoom: 18,
        // pitch: 0,
        // renderWorldCopies: false
      },
      currentMode: 'global'
    }
  },
  computed: {
  },
  components: {},
  mounted () {
    var that = this
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGlkZWlubWUiLCJhIjoiY2o4MXB3eWpvNnEzZzJ3cnI4Z3hzZjFzdSJ9.FIWmaUbuuwT2Jl3OcBx1aQ'
    this.map = new mapboxgl.Map(that.mapParams)
    this.map.on('load', function () {
      console.log('load')
    //   this.map.addSource('polygonSource', {type: 'geojson', data: {}})
    //   this.map.addSource('pointSource', {type: 'geojson', data: {}})
    //   this.map.addLayer({
    //     id: 'polygonLayer',
    //     source: 'polygonSource',
    //     type: 'fill'})
    //   this.map.addLayer({
    //     id: 'pointLayer',
    //     source: 'pointSource',
    //     type: 'circle'})
    })
  },
  watch: {
    displayGeojsonData () {
    //   var that = this
    //   // this.setStyle()
    //   this.map.getSource('polygonSource').setData(this.displayGeojsonData)
    //   this.map.on('mouseover', 'displayPolygon', function (e) {
    //     that.map.setPaintProperty('polygonLayer', 'fill-opacity', 0.6)
    //   })
    //   this.map.on('mouseout', 'polygonLayer', function (e) {
    //     that.map.setPaintProperty('polygonLayer', 'fill-opacity', 0)
    //   })
    //   this.map.on('click', 'polygonLayer', function (e) {
    //     that.$emit('map-region-click', e.feature.id)
    //   })
    //   var geoJSONOptions = {
    //     style: function (feature) {
    //       return {
    //         stroke: true,
    //         color: '#fde350',
    //         weight: 1,
    //         opacity: 1,
    //         fill: true,
    //         fillColor: '#fde350',
    //         fillOpacity: 0.0,
    //         bubblingMouseEvents: true,
    //         interactive: true
    //       }
    //     },
    //     onEachFeature: function (feature, layer) {
    //       layer.on('mouseover', function () {
    //         layer.setStyle({
    //           fillOpacity: 0.6})
    //         that.$emit('map-region-hover', feature.id)
    //       })
    //       layer.on('mouseout', function () {
    //         layer.setStyle({
    //           fillOpacity: 0.0
    //         })
    //         that.$emit('map-region-unhover', feature.id)
    //       })
    //       layer.on('click', function () {
    //         that.$emit('map-region-click', feature.id)
    //       })
    //     }
    //   }
    //   var geoJSON = L.geoJSON(this.displayGeojsonData, geoJSONOptions)
    //   geoJSON.mode = this.displayMode
    //   this.currentLayerGroup.addLayer(geoJSON)
    },
    displayMode () {
      this.setStyle()
    },
    displayPointData () {
    //   this.map.getSource('pointSource').setData(this.displayPointData)
    //   var geoJSONOptions = {
    //     pointToLayer: function (geoJsonPoint, latlng) {
    //       var pointOptions = {
    //         radius: 2,
    //         stroke: false,
    //         color: '#E65217',
    //         weight: 1,
    //         opacity: 1,
    //         fill: true,
    //         fillOpacity: 1
    //         // render: L.svg(),
    //         // className: 'main-point-marker'
    //       }
    //       return L.circleMarker(latlng, pointOptions)
    //       var pointIcon = L.icon({
    //         iconUrl: '../../../../static/icons/point_light.png',
    //         iconSize: [10, 10]
    //       })
    //       return L.marker(latlng, {icon: pointIcon, opacity: 0.8})
    //     }
    //   }
    //   var geoJSON = L.geoJSON(this.displayPointData, geoJSONOptions)
    //   geoJSON.mode = this.displayMode
    //   this.currentLayerGroup.addLayer(geoJSON)
    }
  },
  methods: {
    setStyle () {
    //   var that = this
    //   if (this.displayMode === 'global') {
    //     // style of polygon
    //     that.map.setPaintProperty('polygonLayer', 'fill-opacity', 0)
    //     that.map.setPaintProperty('polygonLayer', 'fill-color', '#fde350')
    //     that.map.setPaintProperty('polygonLayer', 'fill-outline-color', '#fde350')
    //     // style of point
    //     that.map.setPaintProperty('pointLayer', 'circle-radius', 3)
    //     that.map.setPaintProperty('pointLayer', 'circle-color', '#E65217')
    //     that.map.setPaintProperty('pointLayer', 'circle-blur', 0.7)
    //     that.map.setPaintProperty('pointLayer', 'circle-pitch-scale', 'map')
    //   }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("../../../../node_modules/mapbox-gl/dist/mapbox-gl.css");
// #MapView {
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   background-color: #000000;
// }
</style>
