import express from 'express'
import riot from 'riot'
import fs from 'fs'
import tagLoader from './tag-loader'

const app = express()
const PORT = 80

function inject(content, page) {
  const base = fs.readFileSync(`${__dirname}/index.html`, 'utf8')
  return base.replace('{content}', content.toString()).replace('{page}', page)
}

app.use(express.static(`${__dirname}/../.tmp`))
app.use(express.static(`${__dirname}/../node_modules/riot`))

tagLoader(`${__dirname}/tags`)
  .then(tags => {
    app.get('/:collection*?/:details*?/:action*?', (req, res) => {
      const page = req.params.collection || 'home'
      const tag = riot.render(tags['base-page.tag'], {
        riot: riot,
        page
      })
      const html = inject(tag, page)
      res.send(html)
    })

    app.listen(PORT, () => console.log(`Server has started under port: ${PORT}`))
  })
