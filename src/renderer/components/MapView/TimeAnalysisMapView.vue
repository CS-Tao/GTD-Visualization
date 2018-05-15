<template>
  <div id="TimeAnalysisMapView"></div>
</template>

<script>
import L from 'leaflet'
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
    },
    selectedId: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      map: null,
      mapParams: {
        mapContainer: 'TimeAnalysisMapView',
        initCenter: [39, 38],
        url: 'https://api.mapbox.com/styles/v1/hideinme/cjbd5v7f18sxz2rmxt2ewnqtt/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGlkZWlubWUiLCJhIjoiY2o4MXB3eWpvNnEzZzJ3cnI4Z3hzZjFzdSJ9.FIWmaUbuuwT2Jl3OcBx1aQ',
        attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        zoom: 2,
        minZoom: 1,
        maxZoom: 18
      },
      currentMode: 'global',
      currentPointLayerGroup: new L.LayerGroup(),
      currentPolygonLayerGroup: new L.LayerGroup()
    }
  },
  computed: {
  },
  components: {},
  mounted () {
    const map = L.map(this.mapParams.mapContainer,
      {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        worldCopyJump: true
      })
      .setView(this.mapParams.initCenter, this.mapParams.zoom)
    L.tileLayer(this.mapParams.url, {
      attribution: this.mapParams.attribution,
      minZoom: this.mapParams.minZoom,
      maxZoom: this.mapParams.maxZoom
    }).addTo(map)
    this.map = map
    this.map.addLayer(this.currentPointLayerGroup)
    this.map.addLayer(this.currentPolygonLayerGroup)
  },
  watch: {
    displayGeojsonData () {
      var that = this
      var geoJSONOptions = {
        style: function (feature) {
          return {
            stroke: true,
            color: '#fde350',
            weight: 1,
            opacity: 1,
            fill: true,
            fillColor: '#fde350',
            fillOpacity: 0.0,
            bubblingMouseEvents: true,
            interactive: true
          }
        },
        onEachFeature: function (feature, layer) {
          layer.id = feature.id
          layer.on('mouseover', function () {
            layer.setStyle({
              fillOpacity: 0.6})
            that.$emit('map-region-hover', feature.id)
          })
          layer.on('mouseout', function () {
            layer.setStyle({
              fillOpacity: 0.0
            })
            that.$emit('map-region-unhover', feature.id)
          })
          layer.on('click', function () {
            console.log(feature.id)
            that.$emit('map-region-click', feature.id)
          })
        }
      }
      var geoJSON = L.geoJSON(this.displayGeojsonData, geoJSONOptions)
      geoJSON.mode = this.displayMode
      this.currentPolygonLayerGroup.addLayer(geoJSON)
    },
    displayMode () {
      this.setStyle()
    },
    displayPointData () {
    //   this.map.getSource('pointSource').setData(this.displayPointData)
      var geoJSONOptions = {
        pointToLayer: function (geoJsonPoint, latlng) {
          var pointOptions = {
            radius: 2,
            stroke: false,
            color: '#E65217',
            weight: 1,
            opacity: 1,
            fill: true,
            fillOpacity: 1
            // render: L.svg(),
            // className: 'main-point-marker'
          }
          const layer = L.circleMarker(latlng, pointOptions)
          layer.id = geoJsonPoint.id
          return L.circleMarker(latlng, pointOptions)
          // var pointIcon = L.icon({
          //   iconUrl: '../../../../static/icons/point_light.png',
          //   iconSize: [10, 10]
          // })
          // return L.marker(latlng, {icon: pointIcon, opacity: 0.8})
        }
      }
      var geoJSON = L.geoJSON(this.displayPointData, geoJSONOptions)
      geoJSON.mode = this.displayMode
      this.currentPointLayerGroup.addLayer(geoJSON)
    }
  },
  methods: {
    setStyle () {
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("../../../../node_modules/leaflet/dist/leaflet.css");
#TimeAnalysisMapView {
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
