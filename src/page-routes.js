import * as riot from 'riot'
import async from './async'
import tagLoader from './tag-loader'
import fs from 'fs'
import { resolve, isServiceRegistered } from './resolver'
import { convertFormData } from './formDataConverter'

function inject(content, templateUrl) {
  const base = fs.readFileSync(templateUrl, 'utf8')
  return base.replace('{content}', content.toString())
}

function renderPage(state, tags, templateUrl) {
  const tag = riot.render(tags['base-page.tag'], {
    riot,
    state
  })
  return inject(tag, templateUrl)
    .replace('<base-page>', `<base-page state='{ ${JSON.stringify(state)} }'>`)
}

export function register(app, defaultRoute = '/', templateUrl) {
  if (!templateUrl) throw new Error('No template provided')

  function *mountRoutes() {
      const tags = yield tagLoader(`${__dirname}/tags`)

      app.get('/:page*?/:details*?/:action*?', (req, res) => {
        const url = isServiceRegistered(req.url) ? req.url : defaultRoute
        resolve(url, {}).then(state => {
          res.send(renderPage(state, tags, templateUrl))
        })
      })

      app.post('/:collection*?/:details*?/:action*?', (req, res) => {
        const formData = new Map(Object.entries(req.body))
        const data = convertFormData(formData)
        resolve(req.url, data).then(state => {
          res.send(renderPage(state, tags, templateUrl))
        }, error => res.status(400).send(error))
      })
    }

    async(mountRoutes())
}
