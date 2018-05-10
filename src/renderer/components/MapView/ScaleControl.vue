<script>
import L from 'leaflet'

const ScaleControl = L.control.scale

export default {
  props: [
    'vSide',
    'hSide'
  ],
  mounted () {

  },
  render (h) {

  },
  methods: {
    createLeafletElement () {
      // console.log('scalecontrol create')
      return new ScaleControl({
        position: 'topalmostright'
      })
      // const map = this.$store.state.map;
    },
    parentMounted (parent, grandparent) {
      const map = parent.$leafletElement
      console.log('scaleControl', map)
      this.$leafletElement.addTo(map)
    }
  }
}
</script>
