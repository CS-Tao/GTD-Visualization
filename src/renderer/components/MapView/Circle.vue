<script>
import { Circle } from 'leaflet'
import bindEvents from './util/bind-events'

export default {
  props: [
    'latlng',
    'size',
    'color',
    'weight'
  ],
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
      return new Circle(this.latlng, this.size, {
        color: this.color,
        weight: this.weight
      })
    },
    parentMounted (parent) {
      const map = parent.$leafletElement
      this.$leafletElement.addTo(map)
    }
  }
}
</script>
