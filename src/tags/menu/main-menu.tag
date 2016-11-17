<main-menu>
  <nav>
    <ul>
      <menu-link each={ links }
                 url={ url }
                 label={ label }></menu-link>
    </ul>
  </nav>

  <script type="babel">
    this.links = [{
      url: '/login',
      label: 'login'
    }, {
      url: '/user',
      label: 'user'
    }, {
      url: '/todo',
      label: 'todo'
    }]
  </script>
</main-menu>
