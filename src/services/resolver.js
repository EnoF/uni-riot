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

export function formDataToJson(formData) {
  let jsonData = {}
  formData.forEach((value, key) => jsonData[key] = value)
  return jsonData
}

export function addDimensionToJson(flatData) {
  const dimensionalJson = {}
  for (let key in flatData) {
    // create empty objects if necessary
    const path = key.split('.')
    path.reduce(({currentPath, value}, key) => {
      return {

      }
    }, { currentPath: '', value: {}})
    // assign data
    dimensionalJson[key] = flatData
  }
}
