<todo-page>
  <todo-list todos={ todos }></todo-list>
  <script type="babel">
    import Todo from '../../models/todo'

    this.state = this.opts.state
    this.todos = [
      new Todo('One', 'Description One'),
      new Todo('Two', 'Description Two'),
      new Todo('Three', 'Description Three'),
    ]
  </script>
</todo-page>
