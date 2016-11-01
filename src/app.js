import express from 'express'
import bodyParser from 'body-parser'
import riot from 'riot'
import fs from 'fs'
import tagLoader from './tag-loader'
import async from './async'
import user from './services/user'
import login from './services/login'
import todo from './services/todo'
import { resolve } from './services/resolver'

const app = express()
const jsonParser = bodyParser.json()
const formParser = bodyParser.urlencoded({ extended: false })
const PORT = 80

function inject(content) {
  const base = fs.readFileSync(`${__dirname}/index.html`, 'utf8')
  return base.replace('{content}', content.toString())
}

function renderPage(state, tags) {
  const tag = riot.render(tags['base-page.tag'], {
    riot,
    state
  })
  return inject(tag)
    .replace('<base-page>', `<base-page state='{ ${JSON.stringify(state)} }'>`)
}

app.use(jsonParser)
app.use(formParser)
app.use(express.static(`${__dirname}/../.tmp`))
app.use(express.static(`${__dirname}/../node_modules/riot`))

function *startApp() {
  const tags = yield tagLoader(`${__dirname}/tags`)

  app.get('/favicon.ico', (req, res) => res.send())

  app.get('/:page*?/:details*?/:action*?', (req, res) => {
    resolve(req.url, {}).then(state => {
      res.send(renderPage(state, tags))
    })
  })

  app.post('/:collection*?/:details*?/:action*?', (req, res) => {
    resolve(req.url, req.body).then(state => {
      res.send(renderPage(state, tags))
    }, error => res.status(400).send(error))
  })

  app.listen(PORT, () => console.log(`Server has started under port: ${PORT}`))
}

async(startApp())
