<base-page>
  <h1>{ title }</h1>

  <article class="content"
           onsubmit={ submit }>
    <login-page if={ route('login') }
                error={ state.error }></login-page>
    <update-user-page if={ route('update-user')}
                      message={ state.message }
                      auth-token={ state.authToken }
                      user={ state.user }></update-user-page>
    <registration-complete-page if={ route('user-created')}
                                message={ state.message }
                                authToken={ state.authToken }
                                user={ state.user }></registration-complete-page>
  </article>

  <main-menu></main-menu>
  <script type="babel">
    import { convertFormData } from '../../services/formDataConverter'
    import { resolve } from '../../services/resolver'
    const { state } = this.opts

    this.state = state

    this.route = page => this.state.page === page

    this.submit = event => {
      const { target } = event
      const formData = new FormData(target)
      resolve(target.getAttribute('action'), convertFormData(formData))
        .then(state => {
          this.state = state
          this.update()
        })
    }
  </script>
</base-page>
