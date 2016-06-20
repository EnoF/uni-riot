<base-page>
  <h1>{ title }</h1>

  <article class="content">
    <home-page show={ route('home') }></home-page>
    <riot-page show={ route('riot') }></riot-page>
  </article>

  <main-menu></main-menu>
  <script type="babel">
    const { riot, page } = this.opts

    this.title = 'Home'
    this.state = {
      page
    }

    riot.route.base('/')
    riot.route('/*', page => {
      this.state.page = page
      this.update()
    })
    riot.route.start(true)

    this.route = route => this.state.page == route
  </script>
</base-page>
