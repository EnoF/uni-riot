<home-page>
  <form action="/home"
        onsubmit={ submit }
        method="post">
    <input type="hidden"
           value="user"
           name="service">
    <label>
      <span if={ state.name }>Hello { state.name }!</span>
      <span if={ !state.name }>Hello world, who are you?</span>
      <input type="text"
             value="{ state.name }"
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
    import stateResolver from '../../services/state-resolver'
    this.state = this.opts.state
    this.submit = event => {
      const data = {
        service: 'user',
        event: 'save',
        name: this.name.value
      }
      stateResolver.resolve(data, this.state)
        .then(state => this.update())
      event.preventDefault()
    }
  </script>
</home-page>
