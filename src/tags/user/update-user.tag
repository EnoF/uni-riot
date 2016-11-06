<update-user>
  <form method="POST" action="/user">
    <input type="hidden"
           name="event"
           value="update-user">
    <input type="hidden"
           name="authToken"
           value="{ opts.authToken }">

    <label for="update-user-street">
      street:
    </label>
    <input type="text"
           id="update-user-street"
           value="{ user.address.street }"
           name="address.street">
    <button type="submit">update</button>
  </form>

  <script type="babel">
    const { user } = this.opts

    this.on('update', () => this.user = this.opts.user)
  </script>
</update-user>
