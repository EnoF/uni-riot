<login-page>
  <p>{ opts.error }</p>
  <form action="/login" method="post">
    <h3>Login</h3>
    <input type="hidden" name="event" value="login">
    <div class="input-field">
      <label for="login-user-name">
        user name:
      </label>
      <input id="login-user-name"
             type="text"
             name="userName">
    </div>
    <div class="input-field">
      <label for="login-user-password">
        password:
      </label>
      <input type="password"
             id="login-user-password"
             name="password">
    </div>
    <button class="btn"
            type="submit">login</button>
  </form>
  <form action="/user" method="POST">
    <h3>No user yet? Create one now</h3>
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
      confirm password:
    </label>
    <input type="password"
           id="register-user-confirm-password"
           name="confirmPassword">

    <button type="submit">register</button>
  </form>

  <script type="babel">
    import '../../services/login'
    import '../../services/user'
  </script>
</login-page>
