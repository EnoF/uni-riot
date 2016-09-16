import riot from 'riot'

export default class Todo {
  constructor(title, description) {
    riot.observable(this)
    this.title = title
    this.description = description
  }

  reset() {
    this.title = null
    this.description = null
  }

  setTitle(title) {
    this.title = title
  }

  setDescription(description) {
    this.description = description
  }
}
