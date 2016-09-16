<base-page>
  <h1>{ title }</h1>

  <article class="content">
    <home-page show={ route('home') }
               state={ state }></home-page>
    <riot-page show={ route('riot') }
               state={ state }></riot-page>
    <todo-page show={ route('todo') }
               state={ state }></todo-page>
  </article>

  <main-menu></main-menu>
  <script type="babel">
    import { State } from '../../services/state'

    const { riot, state } = this.opts

    this.title = 'Home'
    this.state = new State(this.opts.state)

    riot.route.base('/')
    riot.route('/*', page => {
      this.state.setState({ page })
      this.update()
    })
    riot.route.start(true)

    this.route = route => this.state.getState().page == route
  </script>
</base-page>
