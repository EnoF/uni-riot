import stateResolver from './state-resolver'

export default function createState(initialState = getDefaultState()) {
  return {
    state: initialState,
    setEvent: event => setEvent(event)
  }
}

export function setState(initialState, newState) {
  if (!newState) return;
  Object.keys(newState).forEach(prop => initialState[prop] = newState[prop])
}

function getDefaultState() {
  return {
    name: null,
    page: 'home',
  }
}
