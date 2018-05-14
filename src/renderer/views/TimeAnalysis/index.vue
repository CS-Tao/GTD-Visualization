<template>
  <div id="MapboxView"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl'

export default {
  data () {
    return {
      map: null
    }
  },
  mounted () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGlkZWlubWUiLCJhIjoiY2o4MXB3eWpvNnEzZzJ3cnI4Z3hzZjFzdSJ9.FIWmaUbuuwT2Jl3OcBx1aQ'
    const map = new mapboxgl.Map({
      container: 'MapboxView', // container id
      style: 'mapbox://styles/hideinme/cjbd5v7f18sxz2rmxt2ewnqtt?optimize=true', // stylesheet location
      center: [-74.50, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
    })
    this.map = map
  }
}
</script>

<style lang="scss" scoped>
// @import url("../../../../node_modules/mapbox-gl/dist/mapbox-gl.css");
#MapboxView { 
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

