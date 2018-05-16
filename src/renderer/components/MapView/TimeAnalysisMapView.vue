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
        initCenter: [37, 38],
        url: 'https://api.mapbox.com/styles/v1/hideinme/cjbd5v7f18sxz2rmxt2ewnqtt/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGlkZWlubWUiLCJhIjoiY2o4MXB3eWpvNnEzZzJ3cnI4Z3hzZjFzdSJ9.FIWmaUbuuwT2Jl3OcBx1aQ',
        attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        zoom: 2,
        minZoom: 1,
        maxZoom: 18
      },
      currentPointLayerGroup: new L.LayerGroup(),
      currentPolygonLayerGroup: new L.LayerGroup()
    }
  },
  computed: {
    themeColor () {
      if (this.displayMode === 'global') {
        return '#fde350'
      } else if (this.displayMode === 'region') {
        return '#84E900'
      } else if (this.displayMode === 'country') {
        return '#FF4100'
      }
    },
    pointType () {
      if (this.displayMode === 'global') {
        return function (geoJsonPoint, latlng) {
          const pointOptions = {
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
        }
      } else if (this.displayMode === 'region') {
        return function (geoJsonPoint, latlng) {
          const pointIcon = L.icon({
            iconUrl: '../../../../static/icons/point_light.png',
            iconSize: [10, 10]
          })
          return L.marker(latlng, {icon: pointIcon, opacity: 0.8})
        }
      } else if (this.displayMode === 'country') {
        return function (geoJsonPoint, latlng) {
          const layerGroup = L.LayerGroup()
          const ringOptions = {
            radius: 10,
            stroke: true,
            color: '#E66417',
            weight: 2,
            opacity: 1,
            fill: false,
            render: L.svg(),
            className: 'main-firstring-marker'
          }
          const firstRingLayer = L.circleMarker(latlng, ringOptions)
          ringOptions.className = 'main-secondring-marker'
          const secondRingLayer = L.circleMarker(latlng, ringOptions)
          layerGroup.addLayer(firstRingLayer)
          layerGroup.addLayer(secondRingLayer)
          const pointOptions = {
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
          const pointLayer = L.circleMarker(latlng, pointOptions)
          layerGroup.addLayer(pointLayer)
          return layerGroup
        }
      }
    },
    polygonEventType () {
      const that = this
      if (this.displayMode === 'global') {
        return function (feature, layer) {
          layer.id = feature.id
          layer.on('mouseover', function () {
            layer.setStyle({
              fillOpacity: 0.6})
            that.$emit('map-region-hover', feature.id)
          })
          layer.on('mouseout', function () {
            layer.setStyle({
              fillOpacity: 0.1
            })
            that.$emit('map-region-unhover', feature.id)
          })
          layer.on('click', function () {
            that.$emit('map-region-click', feature.id)
          })
        }
      } else if (this.displayMode === 'region') {
        return function (feature, layer) {
          layer.id = feature.id
          layer.on('mouseover', function () {
            layer.setStyle({
              fillOpacity: 0.6})
            that.$emit('map-region-hover', feature.id)
          })
          layer.on('mouseout', function () {
            layer.setStyle({
              fillOpacity: 0.1
            })
            that.$emit('map-region-unhover', feature.id)
          })
          layer.on('click', function () {
            that.$emit('map-region-click', feature.id)
          })
        }
      }
    }
  },
  components: {},
  mounted () {
    const map = L.map(this.mapParams.mapContainer,
      {
        zoomControl: false,
        attributionControl: false,
        // dragging: false,
        scrollWheelZoom: false,
        worldCopyJump: true,
        doubleClickZoom: false
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
      this.currentPolygonLayerGroup.clearLayers()
      const that = this
      const geoJSONOptions = {
        style: function (feature) {
          return {
            stroke: true,
            color: that.themeColor,
            weight: 1,
            opacity: 1,
            fill: true,
            fillColor: that.themeColor,
            fillOpacity: 0.1,
            bubblingMouseEvents: true,
            interactive: true
          }
        },
        onEachFeature: this.polygonEventType
      }
      const geoJSON = L.geoJSON(this.displayGeojsonData, geoJSONOptions)
      geoJSON.mode = this.displayMode
      this.currentPolygonLayerGroup.addLayer(geoJSON)
    },
    displayMode (newMode, oldMode) {
      const that = this
      this.currentPolygonLayerGroup.getLayers()[0].eachLayer(function (layer) {
        if (layer.id === that.selectedId) {
          layer.setStyle({fillOpacity: 0.9})
          const bounds = layer.getBounds()
          that.map.flyToBounds(bounds, {paddingBottomRight: [100, 0]})
        }
      })
    },
    displayPointData () {
    //   this.map.getSource('pointSource').setData(this.displayPointData)
      this.currentPointLayerGroup.clearLayers()
      const geoJSONOptions = {
        pointToLayer: this.pointType
      }
      const geoJSON = L.geoJSON(this.displayPointData, geoJSONOptions)
      geoJSON.mode = this.displayMode
      this.currentPointLayerGroup.addLayer(geoJSON)
    },
    selectedId (newId, oldId) {
      // change highlight polygon
      if (newId === -1) {
        this.currentPolygonLayerGroup.getLayers()[0].eachLayer(function (layer) {
          if (layer.id === oldId) {
            layer.setStyle({fillOpacity: 0.1})
          }
        })
      } else {
        this.currentPolygonLayerGroup.getLayers()[0].eachLayer(function (layer) {
          if (layer.id === newId) {
            layer.setStyle({fillOpacity: 0.6})
          }
        })
      }
    }
  },
  methods: {
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
.main-point-marker {
    animation: blink 3s ease-out;
    -webkit-animation: blink 3s ease-out;
    transform-origin: 50% 50% 0;
    -webkit-transform-origin: 50% 50% 0;
}

.main-firstring-marker {
    animation: diffusion 2s ease-out forwards 1;
    -webkit-animation: diffusion 2s ease-out forwards 1;
    transform-origin: 50% 50% 0;
    -webkit-transform-origin: 50% 50% 0;
}

.main-secondring-marker {
    opacity: 0;
    animation: diffusion 2s ease-out 1s;
    -webkit-animation: diffusion 2s ease-out 1s;
    transform-origin: 50% 50% 0;
    -webkit-transform-origin: 50% 50% 0;
}

@-webkit-keyframes diffusion {
    from { 
        -webkit-transform: scale(0);
        opacity: 1;
    }
    to {
        -webkit-transform: scale(2);
        opacity: 0;
    }
}
@keyframes diffusion {
    from {
        transform: scale(0);
        -webkit-transform: scale(0);
        opacity: 1;
    } to {
          transform: scale(2);
          -webkit-transform: scale(2);
          opacity: 0;
      }
}
@keyframes blink {
    0% {
        opacity: 0;
        transform: scale(0);
        -webkit-transform: scale(0);
    }
    40% {
        opacity: 1;
        transform: scale(1.0);
        -webkit-transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(0);
        -webkit-transform: scale(0);
    }
}

@-webkit-keyframes blink {
    0% {
        opacity: 0;
        -webkit-transform: scale(0);
    }
    40% {
        opacity: 1;
        -webkit-transform: scale(1);
    }
    100% {
        opacity: 0;
        -webkit-transform: scale(0);
    }
}
</style>
