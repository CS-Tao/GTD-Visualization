<template>
  <div>
    <!-- <vl-map ref="map" :zoom=13 :center="[47.413220, -1.219482]">
    </vl-map> -->
  </div>
</template>

<script>
// import MapComponents from './LeafletComponents'

export default {
  name: 'MapView',
  data () {
    return {

    }
  },
  components: MapComponents,
  mounted () {
    // console.log(JSON.stringify(this.$refs.map.mapObject))
  }
}
</script>
