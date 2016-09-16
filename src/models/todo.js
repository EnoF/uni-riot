import riot from 'riot'

export default class Todo {
  constructor(title, description) {
    riot.observable(this)
    this.title = title
    this.description = description
  }

  setTitle(title) {
    this.title = title
  }

  setDescription(description) {
    this.description = description
  }
}
