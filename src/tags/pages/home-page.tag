<home-page>
  <form action="/home" method="post">
    <label>
      Hello world, who are you?
      <input type="text"
             value="{ name }"
             name="name">
    </label>
    <button type="submit"
            name="event"
            value="save">
      Hi!
    </button>
  </form>
  <script type="babel">
    this.name = 'foo'
  </script>
</home-page>
