<login-page>
  <form action="/user" method="POST">
    <input type="hidden"
           name="event"
           value="create-user">
    <h1>Create a new user</h1>
    <label for="register-user-name">
      user name:
    </label>
    <input id="register-user-name"
           type="text"
           name="name">
    <label for="register-user-password">
      password:
    </label>
    <input type="password"
           id="register-user-password"
           name="password">
    <label for="register-user-confirm-password">
      conform password:
    </label>
    <input type="password"
           id="register-user-confirm-password"
           name="confirmPassword">

    <button type="submit">register</button>
  </form>

  <script type="babel">
    import '../../services/user'
  </script>
</login-page>
