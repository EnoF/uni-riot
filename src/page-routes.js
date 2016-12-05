import * as riot from 'riot'
import async from './async'
import tagLoader from './tag-loader'
import fs from 'fs'
import { resolve, isServiceRegistered } from './resolver'
import { convertFormData } from './formDataConverter'

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

export function register(app, defaultRoute = '/') {
  function *mountRoutes() {
      const tags = yield tagLoader(`${__dirname}/tags`)

      app.get('/:page*?/:details*?/:action*?', (req, res) => {
        const url = isServiceRegistered(req.url) ? req.url : defaultRoute
        resolve(url, {}).then(state => {
          res.send(renderPage(state, tags))
        })
      })

      app.post('/:collection*?/:details*?/:action*?', (req, res) => {
        const formData = new Map(Object.entries(req.body))
        const data = convertFormData(formData)
        resolve(req.url, data).then(state => {
          res.send(renderPage(state, tags))
        }, error => res.status(400).send(error))
      })
    }

    async(mountRoutes())
}
