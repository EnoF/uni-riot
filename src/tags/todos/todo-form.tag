<todo-form>
  <form action="/todo"
        onsubmit="{ submit }"
        method="post">
    <input type="text"
           placeholder="title"
           name="title" />
    <input type="text"
           placeholder="description"
           name="description" />
    <button type="submit">add</button>
  </form>
  <script type="babel">
    this.todo = this.opts.todo

    this.submit = event => {
      this.todo.setTitle(this.title.value)
      this.todo.setDescription(this.description.value)
      this.todo.trigger('submitted', event)
      event.preventDefault()
    }
  </script>
</todo-form>
