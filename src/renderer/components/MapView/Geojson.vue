<script>
import { geoJSON } from 'leaflet'

const GeoJson = geoJSON

export default {
  props: [
    'geojson',
    'color',
    'weight'
  ],
  mounted () {
    const leafletElement = this.$leafletElement = this.createLeafletElement()
    const map = this.$store.state.map.map
    if (map) {
      leafletElement.addTo(map)
    }
  },
  destroyed () {
    this.$leafletElement._map.removeLayer(this.$leafletElement)
  },
  render (h) {

  },
  methods: {
    createLeafletElement () {
      return new GeoJson(this.$props.geojson, {
        color: this.$props.color,
        weight: this.$props.weight
      })
    },
    parentMounted (parent) {
      const map = parent.$leafletElement
      this.$leafletElement.addTo(map)
    }
  }
}
</script>
