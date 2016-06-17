import express from 'express'
import riot from 'riot'
import helloWorld from './tags/hello-world.tag'

const app = express()
const PORT = 80

app.get('/', (req, res) => {
  res.send(riot.render(helloWorld))
})

app.listen(PORT, () => console.log(`Server has started under port: ${PORT}`))
