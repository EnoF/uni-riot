<todo-form>
  <form action="/todo"
        onsubmit="{ submit }"
        method="post">
    <input type="hidden"
           value="todo"
           name="service">
    <input type="text"
           placeholder="title"
           name="title" />
    <input type="text"
           placeholder="description"
           name="description" />
    <button type="submit"
            name="event"
            value="add-todo">add</button>
  </form>
  <script type="babel">
    this.todo = this.opts.todo

    this.submit = event => {
      this.todo.setTitle(this.title.value)
      this.todo.setDescription(this.description.value)
      this.todo.trigger('submitted')
      this.title.value = ''
      this.description.value = ''
      this.title.focus()
      event.preventDefault()
    }
  </script>
</todo-form>
