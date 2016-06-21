class StateResolver {
  constructor() {
    // key: page, value: Service
    this.services = new Map()
  }

  registerService(page, service) {
    this.services.set(page, service)
  }

  resolve(page) {
    return this.services.get(page)
  }
}

export default new StateResolver()
