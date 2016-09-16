import stateResolver from './state-resolver'
import Todo from '../models/todo'

const SERVICE_NAME = 'todo'
const EVENT_ADD_TODO = 'add-todo'
const EVENT_GET_TODO = 'get-todo'

class TodoService {
  constructor() {
    stateResolver.registerService(SERVICE_NAME, this)
    this.todoList = [];
  }

  updateState(data, state) {
    const { event } = data
    switch (event) {
      case EVENT_GET_TODO:
        return this.getTodo(data, state)
      case EVENT_ADD_TODO:
        return this.addTodo(data, state)
      default:
        return Promise.resolve()
    }
  }

  getTodo(data, state) {
    return Promise.resolve(this.todoList)
      .then(todoList => state.setState({ todoList }))
      .then(() => state)
  }

  addTodo(data, state) {
    const { title, description } = data
    this.todoList.push(new Todo(title, description))
    return Promise.resolve(this.todoList)
      .then(todoList => state.setState({ todoList }))
      .then(() => state)
  }
}

export default new TodoService()
