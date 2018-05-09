<script>
import L from 'leaflet'

export default {
  props: [
    'vSide',
    'hSide'
  ],
  render (h) {

  },
  methods: {
    parentMounted (parent) {
      const map = parent.$leafletElement
      map._controlCorners[this.vSide + this.hSide] = L.DomUtil.create('div', 'leaflet-' + this.vSide + ' leaflet-' + this.hSide, map._controlContainer)
    }
  }
}
</script>

<style>
  .leaflet-almostleft {
    position: absolute;
    bottom: 0px;
    left: 60px;
    padding-bottom: 10px;
    z-index: 500;
  }

  .leaflet-almostleft .leaflet-control {
    margin-bottom: 0px;
  }

  .leaflet-almostright {
    position: absolute;
    top: 0px; /* possible because the placeholder's parent is the map */
    /*transform: translateY(-50%); /* using the CSS3 Transform technique */
    /*padding-top: 10px;*/
    right: 60px;
    padding-bottom: 10px;
    z-index: 500;
  }

  .leaflet-almostright .leaflet-control {
    margin-top: 10px;
  }
</style>
