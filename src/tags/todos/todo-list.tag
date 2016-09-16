<todo-list>
  <h1>Todo's</h1>
  <todo-form todo={ newtodo }></todo-form>
  <section>
    <todo-item each={ todo in todos }
               title={ todo.title }
               description={ todo.description }></todo-item>
  </section>

  <script type="babel">
    import Todo from '../../models/todo'

    this.todos = this.opts.todos

    this.newtodo = new Todo();

    this.newtodo.on('submitted', () => {
      const { title, description } = this.newtodo
      this.todos.push(new Todo(title, description))
      this.newtodo.reset()

      this.update()
    })
  </script>
</todo-list>
