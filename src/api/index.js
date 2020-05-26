const api = (module.exports = {})

const express = require('express')
const app = express()
const routes = require('./routes')

api.initialise = () => {
  const apiRouter = express.Router()

  app.get('/', (req, res) => {
    res.status(200).json({ up: true })
  })

  routes.initialise(apiRouter, (err) => {
    if (err) console.error(err, 'Unable to start API')
    app.use('/api', apiRouter)
    app.listen(3000, () => {
      console.log('API is listening...')
    })
  })
}
