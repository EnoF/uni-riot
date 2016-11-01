<base-page>
  <h1>{ title }</h1>

  <article class="content">
    <login-page show={ route('login') }></login-page>
    <registration-complete-page show={ route('user-created')}
                                user={ state.user }></registration-complete-page>
  </article>

  <main-menu></main-menu>
  <script type="babel">
    const { state } = this.opts

    this.state = state

    this.route = page => state.page === page
  </script>
</base-page>
