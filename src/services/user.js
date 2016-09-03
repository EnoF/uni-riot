import stateResolver from './state-resolver'

const SERVICE_NAME = 'user'
const EVENT_SAVE = 'save'

class User {
  constructor() {
    stateResolver.registerService(SERVICE_NAME, this)
  }

  trigger(data, state) {
    const { event } = data
    switch (event) {
      case EVENT_SAVE:
        return this.saveName(data, state)
        break;
      default:
        return Promise.resolve()
    }
  }

  saveName(data, state) {
    return Promise.resolve({
      name: data.name
    }).then(data => state.setState({ name: data.name }))
      .then(() => state)
  }
}

export default new User()
