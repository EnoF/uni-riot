import express from 'express'
import riot from 'riot'
import tagLoader from './tag-loader'

const app = express()
const PORT = 80

tagLoader(`${__dirname}/tags`)
  .then(tags => {
    app.get('/', (req, res) => {
      res.send(riot.render(tags['home-page.tag']))
    })

    app.get('/:page', (req, res) => {
      res.send(riot.render(tags['base-page.tag'], {
        page: req.params.page
      }))
    })

    app.listen(PORT, () => console.log(`Server has started under port: ${PORT}`))
  })
