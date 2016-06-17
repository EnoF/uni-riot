<base-tag>
  <h1>{ title }</h1>

  <article class="content">
    <yield></yield>
  </article>

  <main-menu></main-menu>
  <script type="babel">
    this.title = this.opts.page
  </script>
</base-tag>
