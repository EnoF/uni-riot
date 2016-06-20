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
      url: '/home',
      label: 'home'
    }, {
      url: '/riot',
      label: 'riot'
    }]
  </script>
</main-menu>
