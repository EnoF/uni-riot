import express from 'express'
import riot from 'riot'
import baseTag from './tags/pages/base-page.tag'
import homePage from './tags/pages/home-page.tag'
import mainMenu from './tags/menu/main-menu.tag'
import menuLink from './tags/menu/menu-link.tag'

const app = express()
const PORT = 80

app.get('/', (req, res) => {
  res.send(riot.render(homePage))
})

app.get('/:page', (req, res) => {
  res.send(riot.render(baseTag, {
    page: req.params.page
  }))
})

app.listen(PORT, () => console.log(`Server has started under port: ${PORT}`))
