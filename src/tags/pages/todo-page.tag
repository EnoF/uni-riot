<todo-page>
  <todo-list todos={ todos }></todo-list>
  <script type="babel">
    this.state = this.opts.state
    this.todos = [{
      title: 'One',
      description: 'Todo one'
    }, {
      title: 'Two',
      description: 'Todo two'
    }, {
      title: 'Three',
      description: 'Todo three'
    }]
  </script>
</todo-page>
