import express from 'express'
import bodyParser from 'body-parser'
import riot from 'riot'
import fs from 'fs'
import tagLoader from './tag-loader'
import async from './async'
import user from './services/user'
import todo from './services/todo'
import { State } from './services/state'
import stateResolver from './services/state-resolver'

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
    const state = new State({
      page
    })
    stateResolver.resolve({ service: 'todo', event: 'get-todo' }, state).then(state => {
      const tag = riot.render(tags['base-page.tag'], {
        riot,
        state: state.state
      })
      const html = inject(tag, page)
        .replace('<base-page>', `<base-page state='{ ${JSON.stringify(state.state)} }'>`)
      res.send(html)
    })
  })

  app.post('/:collection*?/:details*?/:action*?', (req, res) => {
    const { collection, details, action } = req.params
    const { event } = req.body

    const state = new State({
      page: collection
    })
    stateResolver.resolve(req.body, state).then(state => {
      // Injecting riot into the state
      const browserState = { state: state.getState(), riot }
      const tag = riot.render(tags['base-page.tag'], browserState)
      const html = inject(tag, collection)
        .replace('<base-page>', `<base-page state='{ ${JSON.stringify(state.getState())} }'>`)
      res.send(html)
    })
  })

  app.listen(PORT, () => console.log(`Server has started under port: ${PORT}`))
}

async(startApp())
