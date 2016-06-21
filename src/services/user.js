import stateResolver from './state-resolver'

const PAGE = 'home'
const EVENT_SAVE = 'save'

class User {
  constructor() {
    stateResolver.registerService(PAGE, this)
  }

  onUpdate(event, state) {
    switch (event.name) {
      case EVENT_SAVE:
        return this.saveName(event, state)
      default:
        return Promise.resolve()
    }
  }

  saveName(event, state) {
    return Promise.resolve({
      name: event.details.name
    }).then(data => Promise.resolve({...state, name: data.name}))
  }
}

export default new User()
