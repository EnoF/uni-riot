class StateResolver {
  constructor() {
    // key: page, value: Service
    this.services = new Map()
  }

  registerService(serviceName, service) {
    this.services.set(serviceName, service)
  }

  resolve(data, state) {
    const { service } = data
    const instance = this.services.get(service)
    return instance.trigger(data, state)
  }
}

export default new StateResolver()
