<home-page>
  <form action="/home"
        onsubmit={ submit }
        method="post">
    <input type="hidden"
           value="user"
           name="service">
    <label>
      <span if={ getName() }>Hello { getName() }!</span>
      <span if={ !getName() }>Hello world, who are you?</span>
      <input type="text"
             value="{ getName() }"
             name="name">
    </label>
    <button type="submit"
            name="event"
            value="save">
      Hi!
    </button>
  </form>
  <script type="babel">
    import user from '../../services/user'

    this.state = this.opts.state

    this.getName = () => this.state.getState().name

    this.submit = event => {
      user.saveName({ name: this.name.value }, this.state)
        .then(() => this.update())

      event.preventDefault()
    }
  </script>
</home-page>
