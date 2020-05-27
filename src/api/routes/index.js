const routes = (module.exports = {})

const fs = require('fs')
const path = require('path')

const routesPath = path.resolve(__dirname)

routes.initialise = (apiRouter, callback) => {
  fs.readdir(routesPath, (err, routes) => {
    if (err) return callback('Unable to determine routes')

    routes.forEach((filename) => {
      const routeName = filename.split('.')[0]

      if (!/^index$/.test(routeName)) {
        const routeConfig = require('./' + routeName)
        const allowedHttpMethods = routeConfig.allowedHttpMethods || []

        allowedHttpMethods.forEach((httpMethod) => {
          apiRouter[httpMethod](routeConfig.path, (req, res) => {
            routeConfig.handler(req, (err, result) => {
              if (err) return res.status(500).json({ error: err })
              return res.status(200).json(result)
            })
          })
        })
      }
    })
  })

  return callback()
}
