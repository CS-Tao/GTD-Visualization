<template>
  <div>
    <div :id="mapId"></div>
  </div>
</template>

<script>
import L from 'leaflet'
export default {
  name: 'MapView',
  props: {
    mapId: {
      type: String,
      requre: true
    },
    displayGeojsonData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // global/region/country/detail
    displayMode: {
      type: String,
      default: 'global'
    },
    displayPointData: {
      type: Object,
      default: () => {
        return {}
      }
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
      const that = this
      if (this.displayMode === 'global') {
        return {
          pointToLayer: function (geoJsonPoint, latlng) {
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
        }
      } else if (this.displayMode === 'region') {
        return {
          pointToLayer: function (geoJsonPoint, latlng) {
            const pointIcon = L.icon({
              iconUrl: '../../../../static/icons/point_light.png',
              iconSize: [10, 10]
            })
            return L.marker(latlng, {icon: pointIcon, opacity: 0.8})
          }
        }
      } else if (this.displayMode === 'country') {
        return {
          pointToLayer: function (geoJsonPoint, latlng) {
            const pointIcon = L.icon({
              iconUrl: 'static/icons/pin_red.png',
              iconSize: [16, 24],
              iconAnchor: [8, 24]
            })
            const activeIcon = L.icon({
              iconUrl: 'static/icons/pin_blue.png',
              iconSize: [16, 24],
              iconAnchor: [8, 24]
            })
            const layer = L.marker(latlng, {
              icon: pointIcon,
              riseOnHover: true
            })
            // const pointOptions = {
            //   radius: 7,
            //   stroke: false,
            //   color: '#E66417',
            //   weight: 1,
            //   opacity: 1,
            //   fill: true,
            //   fillOpacity: 1,
            //   render: L.svg(),
            //   className: 'main-point-marker'
            // }
            // const layer = L.circleMarker(latlng, pointOptions)
            // layer.id = geoJsonPoint.id
            // layer.on('mouseover', function () {
            //   layer.setStyle({
            //     fillColor: '#EA0037'
            //   })
            // })
            // layer.on('mouseout', function () {
            //   layer.setStyle({
            //     fillColor: '#E66417'
            //   })
            // })
            layer.on('mouseover', function () {
              layer.setIcon(activeIcon)
            })
            layer.on('mouseout', function () {
              layer.setIcon(pointIcon)
            })
            layer.on('click', function () {
              that.map.flyTo(L.latLng(layer.getLatLng().lat, layer.getLatLng().lng + 2), that.map.getZoom() + 2)
              that.$emit('map-region-click', geoJsonPoint.id)
            })
            return layer
          },
          onEachFeature: function (feature, layer) {
            const ringOptions = {
              radius: 16,
              stroke: true,
              color: '#E66417',
              weight: 2,
              opacity: 1,
              fill: false,
              render: L.svg(),
              className: 'main-firstring-marker'
            }
            const firstRingLayer = L.circleMarker(layer.getLatLng(), ringOptions)
            ringOptions.className = 'main-secondring-marker'
            const secondRingLayer = L.circleMarker(layer.getLatLng(), ringOptions)
            firstRingLayer.on('mouseover', function () {
              firstRingLayer.setStyle({
                color: '#F80012'
              })
            })
            secondRingLayer.on('mouseover', function () {
              secondRingLayer.setStyle({
                color: '#F80012'
              })
            })
            firstRingLayer.on('mouseout', function () {
              firstRingLayer.setStyle({
                color: '#F80012'
              })
            })
            secondRingLayer.on('mouseout', function () {
              secondRingLayer.setStyle({
                color: '#F80012'
              })
            })
            that.currentPointLayerGroup.addLayer(firstRingLayer)
            // that.currentPointLayerGroup.addLayer(secondRingLayer)
            // layer.on('mouseover', function () {
            //   layer.setStyle({
            //     fillColor: '#EA0037'
            //   })
            // })
            // layer.on('mouseout', function () {
            //   layer.setStyle({
            //     fillColor: '#E66417'
            //   })
            // })
            // layer.on('click', function () {
            //   that.$emit('map-region-click', feature.id)
            // })
          }
        }
      } else if (this.displayMode === 'detail') {
        return {
          pointToLayer: function (geoJsonPoint, latlng) {
            const pointOptions = {
              radius: 10,
              stroke: false,
              color: '#F80012',
              weight: 1,
              opacity: 1,
              fill: true,
              fillOpacity: 1,
              render: L.svg(),
              className: 'main-point-marker'
            }
            return L.circleMarker(latlng, pointOptions)
          },
          onEachFeature: function (feature, layer) {
            const ringOptions = {
              radius: 30,
              stroke: true,
              color: '#F80012',
              weight: 3,
              opacity: 1,
              fill: false,
              render: L.svg(),
              className: 'main-firstring-marker'
            }
            const firstRingLayer = L.circleMarker(layer.getLatLng(), ringOptions)
            ringOptions.className = 'main-secondring-marker'
            const secondRingLayer = L.circleMarker(layer.getLatLng(), ringOptions)
            that.currentPointLayerGroup.addLayer(firstRingLayer)
            that.currentPointLayerGroup.addLayer(secondRingLayer)
          }
        }
      }
    },
    polygonEventType () {
      const that = this
      if (this.displayMode === 'global') {
        return function (feature, layer) {
          layer.id = feature.id
          layer.on('mouseover', function () {
            that.$emit('map-region-hover', feature.id)
          })
          layer.on('mouseout', function () {
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
            that.$emit('map-region-hover', feature.id)
          })
          layer.on('click', function () {
            that.$emit('map-region-click', feature.id)
          })
        }
      } else if (this.displayMode === 'country') {
        return function (feature, layer) {}
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
            weight: 2,
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
      // geoJSON.mode = this.displayMode
      this.currentPolygonLayerGroup.addLayer(geoJSON)
    },
    displayMode (newMode, oldMode) {
      const that = this
      if (newMode === 'region') {
        if (oldMode === 'global') {
          this.currentPolygonLayerGroup.getLayers()[0].eachLayer(function (layer) {
            if (layer.id === that.selectedId) {
              layer.setStyle({fillOpacity: 0.9})
              const bounds = layer.getBounds()
              that.map.flyToBounds(bounds, {paddingBottomRight: [0, 0]})
            }
          })
        }
      } else if (newMode === 'country') {
        if (oldMode === 'region') {
          this.currentPolygonLayerGroup.getLayers()[0].eachLayer(function (layer) {
            if (layer.id === that.selectedId) {
              layer.setStyle({fillOpacity: 0.9})
              const bounds = layer.getBounds()
              that.map.flyToBounds(bounds)
            }
          })
        }
      } else if (newMode === 'global') {
        this.map.setView([37, 38], 2)
      }
    },
    displayPointData (newData, oldData) {
      this.currentPointLayerGroup.clearLayers()
      const geoJSON = L.geoJSON(newData, this.pointType)
      // geoJSON.mode = this.displayMode
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
        if (oldId !== -1) {
          this.currentPolygonLayerGroup.getLayers()[0].eachLayer(function (layer) {
            if (layer.id === oldId) {
              layer.setStyle({fillOpacity: 0.1})
            }
          })
        }
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
    animation-iteration-count: infinite!important;
    -webkit-animation-iteration-count: infinite!important;
    transform-origin: 50% 50% 0;
    -webkit-transform-origin: 50% 50% 0;
}

.main-firstring-marker {
    animation: diffusion 2s ease-out forwards infinite!important;
    -webkit-animation: diffusion 2s ease-out forwards infinite!important;
    animation-iteration-count: infinite!important;
    -webkit-animation-iteration-count: infinite!important;
    transform-origin: 50% 50% 0;
    -webkit-transform-origin: 50% 50% 0;
}

.main-secondring-marker {
    opacity: 0;
    animation: diffusion 2s ease-out 1s infinite!important;
    -webkit-animation: diffusion 2s ease-out 1s infinite!important;
    animation-iteration-count: infinite!important;
    -webkit-animation-iteration-count: infinite!important;
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
