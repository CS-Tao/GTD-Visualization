function bindEvents (vue, leafletElement, events) {
  const leafletEvents = Object.keys(events)
    .filter(eventName => {
      return eventName.startsWith('l-')
    })
    .map(eventName => eventName.slice(2))

  for (let leafletEvent of leafletEvents) {
    const vueEvent = 'l-' + leafletEvent
    leafletElement.on(leafletEvent, (e) => {
      vue.$emit(vueEvent, e)
    })
  }
}

export default bindEvents
