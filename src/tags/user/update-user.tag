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

    <label for="update-user-street">
      street:
    </label>
    <input type="text"
           id="update-user-street"
           value="{ user.address.street }"
           name="address.street">
    <label for="update-user-no">
      no:
    </label>
    <input type="text"
           id="update-user-no"
           value="{ user.address.no }"
           name="address.no">
    <button type="submit">update</button>
  </form>

  <script type="babel">
    const { user } = this.opts

    this.on('update', () => this.user = this.opts.user)
  </script>
</update-user>
