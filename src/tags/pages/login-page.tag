<login-page>
  <div class="row">
    <div class="col s6">
      <p>{ opts.error }</p>
      <form action="/login" method="post">
        <h3>Login</h3>
        <input type="hidden" name="event" value="login">
        <div class="row">
          <input-field class-name="col s12" id="login-user-name" type="text" name="userName">user name:</input-field>
        </div>
        <div class="row">
          <input-field class-name="col s12" id="login-user-password" type="password" name="password">password:</input-field>
        </div>
        <button class="btn" type="submit">login</button>
      </form>
    </div>
    <div class="col s6">
      <form action="/user" method="POST">
        <input type="hidden" name="event" value="create-user">
        <h4>Create a new user</h4>
        <div class="row">
          <input-field class-name="col s12" id="register-user-name" name="userName" type="text">user name:</input-field>
        </div>
        <div class="row">
          <input-field class-name="col s12" id="register-user-password" name="password" type="password">password:</input-field>
        </div>
        <div class="row">
          <input-field class-name="col s12" id="register-user-confirm-password" name="confirmPassword" type="password">confirm password:</input-field>
        </div>
        <button class="btn" type="submit">register</button>
      </form>
    </div>
  </div>
  <script type="babel">
    import '../../services/login'
    import '../../services/user'
  </script>
</login-page>
