<todo-list>
  <h1>Todo's</h1>

  <section>
    <todo-item each={ todo in todos }
               title={ todo.title }
               description={ todo.description }></todo-item>
  </section>

  <script type="babel">
    this.todos = this.opts.todos
  </script>
</todo-list>
