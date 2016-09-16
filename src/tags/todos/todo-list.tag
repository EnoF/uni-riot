<todo-list>
  <h1>Todo's</h1>
  <todo-form todo={ newtodo }></todo-form>
  <section>
    <todo-item each={ todo in todos }
               title={ todo.title }
               description={ todo.description }></todo-item>
  </section>

  <script type="babel">
    this.todos = this.opts.todos

    this.newtodo = new Todo();
  </script>
</todo-list>
