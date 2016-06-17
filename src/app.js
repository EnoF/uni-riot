import express from 'express'
import riot from 'riot'
import fs from 'fs'
import tagLoader from './tag-loader'

const app = express()
const PORT = 80

function inject(content) {
  const base = fs.readFileSync(`${__dirname}/index.html`, 'utf8')
  return base.replace('{content}', content.toString())
}

app.use(express.static(`${__dirname}/../.tmp`))

tagLoader(`${__dirname}/tags`)
  .then(tags => {

    app.get('/', (req, res) => {
      const tag = riot.render(tags['home-page.tag'])
      const html = inject(tag)
      res.send(html)
    })

    app.get('/:page', (req, res) => {
      if (req.params.page) return res.sendStatus(404)
      const tag = riot.render(tags[`${req.params.page}-page.tag`])
      const html = inject(tag)
      res.send(html)
    })

    app.listen(PORT, () => console.log(`Server has started under port: ${PORT}`))
  })
