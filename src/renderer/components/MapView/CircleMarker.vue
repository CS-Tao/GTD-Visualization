<script>
import { CircleMarker } from 'leaflet'
import bindEvents from './util/bind-events'

export default {
  props: [
    'latlng',
    'radius',
    'fillColor',
    'color',
    'weight',
    'opacity',
    'fillOpacity',
    'data',
    'pane'
  ],
  watch: {
    latlng (nextLatlng) {
      this.$leafletElement._map.removeLayer(this.$leafletElement)
      const leafletElement = this.$leafletElement = this.createLeafletElement()
      const map = this.$store.state.map.map
      if (map) {
        leafletElement.addTo(map)
      }
    }
  },
  mounted () {
    const leafletElement = this.$leafletElement = this.createLeafletElement()
    const map = this.$store.state.map.map
    if (map) {
      leafletElement.addTo(map)
    }
    bindEvents(this, this.$leafletElement, this._events)
  },
  destroyed () {
    this.$leafletElement._map.removeLayer(this.$leafletElement)
  },
  render (h) {

  },
  methods: {
    createLeafletElement () {
      const props = this.$props
      const {
        latlng,
        ...options
      } = props
      const newCircleMarker = new CircleMarker(latlng, options)
      return newCircleMarker
    },
    parentMounted (parent) {
      const map = parent.$leafletElement
      this.$leafletElement.addTo(map)
    }
  }
}
</script>
