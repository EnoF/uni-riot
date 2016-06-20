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
app.use(express.static(`${__dirname}/../node_modules/riot`))

tagLoader(`${__dirname}/tags`)
  .then(tags => {
    function resolveTag(req, res) {
      const tag = tags[`${req.params.collection}-page.tag`]
      return tag ? tag : res.redirect('/home')
    }

    app.get('/:collection*?/:details*?/:action*?', (req, res) => {
      const tag = riot.render(resolveTag(req, res))
      const html = inject(tag)
      res.send(html)
    })

    app.listen(PORT, () => console.log(`Server has started under port: ${PORT}`))
  })
