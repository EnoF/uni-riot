import stateResolver from './state-resolver'

export class State {
  constructor(initialState = this.getDefaultState()) {
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = { ...this.state, ...state }
  }

  getDefaultState() {
    return {
      name: null,
      page: 'home',
    }
  }
}
