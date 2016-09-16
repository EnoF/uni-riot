<todo-page>
  <todo-list todos={ todos }></todo-list>
  <script type="babel">
    import Todo from '../../models/todo'

    this.state = this.opts.state
    const { todoList = [] } = this.state.state
    this.todos = todoList
      .map(todo => new Todo(todo.title, todo.description))
  </script>
</todo-page>
