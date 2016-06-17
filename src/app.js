import express from 'express'
import riot from 'riot'
import baseTag from './tags/base-tag.tag'
import mainMenu from './tags/main-menu.tag'
import menuLink from './tags/menu-link.tag'

const app = express()
const PORT = 80

app.get('/', (req, res) => {
  res.redirect('/home');
})

app.get('/:page', (req, res) => {
  res.send(riot.render(baseTag, {
    page: req.params.page
  }))
})

app.listen(PORT, () => console.log(`Server has started under port: ${PORT}`))
