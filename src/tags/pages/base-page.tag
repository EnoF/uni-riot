<base-page>
  <h1>{ title }</h1>

  <article class="content"
           onsubmit={ submit }>
    <login-page show={ route('login') }></login-page>
    <registration-complete-page show={ route('user-created')}
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
