import express from 'express'
import bodyParser from 'body-parser'
import RestIO from 'rest-io'
import mongoose from 'mongoose';
import riot from 'riot'
import async from './async'
import user from './services/user'
import login from './services/login'
import todo from './services/todo'
import { register } from './page-routes'

const app = express()
const jsonParser = bodyParser.json()
const formParser = bodyParser.urlencoded({ extended: false })
const PORT = 80

app.use(jsonParser)
app.use(formParser)
app.use(express.static(`${__dirname}/../.tmp`))
app.use(express.static(`${__dirname}/../node_modules/riot`))

// DEMO purpose only
process.env.REST_IO_HMAC_KEY = process.env.REST_IO_HMAC_KEY || 'hmac key which set via js to demo';
process.env.REST_IO_AES_KEY = process.env.REST_IO_AES_KEY || 'aes key which is set via js to demo';

function *startApp() {
  app.get('/favicon.ico', (req, res) => res.send())

  new RestIO(app, {
    resources: __dirname + '/resources'
  });

  register(app, '/login')

  mongoose.connect('mongodb://mongo:27017/test');

  app.listen(PORT, () => console.log(`Server has started under port: ${PORT}`))
}

async(startApp())
