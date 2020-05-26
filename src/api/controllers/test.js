const testController = (module.exports = {})

testController.test = (req, callback) => {
  return callback(null, {
    foo: 'bar'
  })
}
