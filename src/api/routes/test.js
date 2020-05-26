const paths = require('../paths')
const testController = require('../controllers/test')

module.exports = {
  path: paths.test,
  allowedHttpMethods: ['get'],
  handler: testController.test,
  params: []
}
