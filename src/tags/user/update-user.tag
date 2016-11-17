<update-user>
  <p>{ opts.message }</p>
  <form method="POST" action="/user">
    <input type="hidden"
           name="event"
           value="update-user">
    <input type="hidden"
           name="authToken"
           value="{ opts.authToken }">
    <input type="hidden"
           name="id"
           value="{ opts.user.id }">

    <div class="row">
      <input-field class-name="col s12" id="update-address-street" type="text" name="address.street">street:</input-field>
    </div>
    <div class="row">
      <input-field class-name="col s12" id="update-address-no" type="text" name="address.no">no:</input-field>
    </div>
    <button class="btn" type="submit">update</button>
  </form>

  <script type="babel">
    const { user } = this.opts

    this.on('update', () => this.user = this.opts.user)
  </script>
</update-user>
