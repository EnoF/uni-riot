import stateResolver from './state-resolver'

export default function createState(initialState = getDefaultState()) {
  return {
    state: initialState,
    setEvent: event => setEvent(event)
  }
}

function setEvent(event) {
  stateResolver(event, this.state).then(() => this.update())
}

function getDefaultState() {
  return {
    name: 'world',
    page: 'home',
  }
}

// export default class State {
//   constructor(initialState = this.getDefaultState) {
//     this.state = initialState
//   }
//
//   get page() {
//     return this.state.page
//   }
//
//   set page(page) {
//     this.state.page = page
//   }
//
//   getDefaultState() {
//     return {
//       page: 'home'
//     }
//   }
// }
