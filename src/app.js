import express from 'express'
import bodyParser from 'body-parser'
import riot from 'riot'
import fs from 'fs'
import tagLoader from './tag-loader'
import async from './async'

const app = express()
const jsonParser = bodyParser.json()
const formParser = bodyParser.urlencoded({ extended: false })
const PORT = 80

function inject(content, page) {
  const base = fs.readFileSync(`${__dirname}/index.html`, 'utf8')
  return base.replace('{content}', content.toString()).replace('{page}', page)
}

app.use(jsonParser)
app.use(formParser)
app.use(express.static(`${__dirname}/../.tmp`))
app.use(express.static(`${__dirname}/../node_modules/riot`))

function *startApp() {
  const tags = yield tagLoader(`${__dirname}/tags`)

  app.get('/:page*?/:details*?/:action*?', (req, res) => {
    const { page = 'home' } = req.params
    const tag = riot.render(tags['base-page.tag'], {
      riot,
      page
    })
    const html = inject(tag, page)
    res.send(html)
  })

  app.post('/:collection*?/:details*?/:action*?', (req, res) => {
    const { collection, details, action } = req.params
    const { event } = req.body
    const tag = riot.render(tags['base-page.tag'], {
      riot,
      page: collection,
      event
    })
    const html = inject(tag, collection)
      .replace('<base-page>', `<base-page event="${event}">`)
    res.send(html)
  })

  app.listen(PORT, () => console.log(`Server has started under port: ${PORT}`))
}

async(startApp())
