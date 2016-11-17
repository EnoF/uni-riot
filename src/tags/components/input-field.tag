<input-field class="input-field { opts.className }">
  <label class={ 'active': active }
         for="{ opts.id }">
    <yield />
  </label>
  <input type="{ opts.type || 'text' }"
         onfocus={ focus }
         onblur={ blur }
         name="{ opts.name }">

  <script type="babel">
    const { name } = this.opts
    this.getValue = () => this[name].value

    this.active = false

    this.focus = () => this.active = true
    this.blur = () => this.active = !!this.getValue()
  </script>
</input-field>
