<registration-complete-page>
  <p>Thank you for registering {user.name}!</p>

  <form method="POST" action="/user">
    <input type="hidden"
           name="event"
           value="update-user">

    <input id="register-user-name"
           type="text"
           value="{ user.name }"
           name="name">
    <label for="update-user-password">
      password:
    </label>
    <input type="password"
           id="update-user-password"
           name="password">

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
</registration-complete-page>
