<template>
  <div>
    <slot />
  </div>
</template>

<script>
import L from 'leaflet'

export default {
  props: ['position'],
  methods: {
    createLeafletElement (L) {
      class ControlParent extends L.Control {
        constructor (el, options) {
          super(options)
          this.el = el
        }
        onAdd () {
          const el = this.el
          L.DomEvent.disableClickPropagation(el)

          return el
        }
      }

      const el = this.$el
      return new ControlParent(el, {
        position: this.position
      })
    },
    parentMounted (parent, props) {
      // console.log('control parentMounted is running')
      const leafletElement = this.createLeafletElement(L)
      this.$leafletElement = leafletElement
      const map = parent.$leafletElement
      leafletElement.addTo(map)
    }
  }
}
</script>
