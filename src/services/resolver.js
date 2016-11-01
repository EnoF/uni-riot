const services = new Map()

export function registerService(serviceUrl, events) {
  services.set(serviceUrl, events)
}

export function resolve(serviceUrl, formData) {
  const serviceEvents = services.get(serviceUrl)
  const { event } = formData
  const eventHandler = serviceEvents.get(event)
  return eventHandler(formData)
}
